const assert = require("assert");
const request = require("supertest");
const app = require("../server");
const { MIN_BUDGET_AMT } = require("../constants");

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
    const testBudget = 100;
    // Exercise
    const response = await request(app)
      .post("/envelopes/")
      .send({ title: testString, budget: testBudget });
    // Verify
    assert.equal(response.status, 201);
  });
});
