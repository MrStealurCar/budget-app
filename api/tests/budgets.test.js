const assert = require("assert");
const request = require("supertest");
const app = require("../server");
const { MIN_BUDGET_AMT } = require("../constants");
const { pool } = require("../postgres");

// Initial Budget tests
describe("Budget Route", () => {
  it("accepts a positive number as a total budget", async () => {
    // Setup
    const testBudget = MIN_BUDGET_AMT;
    // Exercise
    const response = await request(app) // tells Supertest which Express app to hit.
      .post("/total-budget/total_budget")
      .send({ total_budget: testBudget });
    // Verify
    assert.equal(response.status, 201);
  });

  it("rejects a negative number as a total budget", async () => {
    // Setup
    const testBudget = MIN_BUDGET_AMT * -1;
    // Exercise
    const response = await request(app)
      .post("/total-budget/total_budget")
      .send({ total_budget: testBudget });
    // Verify
    assert.equal(response.status, 400);
  });

  it("accepts 0 as a budget", async () => {
    // Setup
    const testBudget = 0;
    // Exercise
    const response = await request(app)
      .post("/total-budget/total_budget")
      .send({ total_budget: testBudget });
    // Verify
    assert.equal(response.status, 201);
  });
});

// Creating entry tests
describe("Creating Entries", () => {
  it("contains a title and budget", async () => {
    // Setup
    const testString = "Hello, World";
    const testBudget = MIN_BUDGET_AMT;
    // Exercise
    const response = await request(app)
      .post("/envelopes/")
      .set("user_id", "user_A")
      .send({ title: testString, budget: testBudget });
    // Verify
    assert.equal(response.status, 201);
  });
});

// Filtering database tests
describe("Filtering Database Entries", () => {
  // Clears the database before each test
  beforeEach(async () => {
    await pool.query("DELETE FROM budget_entries WHERE user_id IN ($1, $2)", [
      "user_A_test",
      "user_B_test",
    ]);

    await pool.query("DELETE FROM saved_total WHERE user_id IN ($1, $2)", [
      "user_A_test",
      "user_B_test",
    ]);
  });

  it("returns only entries belonging to the requested user when multiple users exist", async () => {
    // Setup
    const userA = "user_A_test";
    const userB = "user_B_test";

    // Set total budgets for both users
    await request(app)
      .post("/total-budget/total_budget")
      .set("user_id", userA)
      .send({ total_budget: 500 });

    await request(app)
      .post("/total-budget/total_budget")
      .set("user_id", userB)
      .send({ total_budget: 500 });

    // Create an entry for user A
    const createA = await request(app)
      .post("/envelopes/")
      .set("user_id", userA)
      .send({ title: "Netflix", budget: 10 });

    assert.equal(createA.status, 201);

    // Create two entries for user B
    const createB1 = await request(app)
      .post("/envelopes/")
      .set("user_id", userB)
      .send({ title: "Mcdonalds", budget: 20 });

    const createB2 = await request(app)
      .post("/envelopes/")
      .set("user_id", userB)
      .send({ title: "Hulu/Disney+", budget: 30 });

    assert.equal(createB1.status, 201);
    assert.equal(createB2.status, 201);

    // Exercise: request envelopes as user B
    const response = await request(app)
      .get("/envelopes/")
      .set("user_id", userB);

    // Verify
    assert.equal(response.status, 200);

    // Every returned entry must belong to userB, and none should be from userA
    response.body.forEach((entry) => {
      assert.equal(entry.user_id, userB);
    });

    // Optionally, check that the two B entries are present
    const titles = response.body.map((e) => e.title);
    assert.ok(titles.includes("Mcdonalds"));
    assert.ok(titles.includes("Hulu/Disney+"));
  });
});
