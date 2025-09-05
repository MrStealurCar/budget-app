const assert = require("assert");
const request = require("supertest");
const app = require("../server");
describe("Budget Route", () => {
  it("expects a positive number as a total budget", async () => {
    // Setup
    const testBudget = 100;
    // Exercise
    const response = await request(app) // tells Supertest which Express app to hit.
      .post("/total-budget/total_budget")
      .send({ budget: testBudget });
    // Verify
    assert.equal(response.status, 201);
  });
  it("Rejects a negative number as a total budget", async () => {
    //Setup
    const testBudget = -100;
    // Exercise
    const response = await request(app)
      .post("/total-budget/total_budget")
      .send({ total_budget: testBudget });
    // Verify
    assert.equal(response.status, 400);
  });
});
