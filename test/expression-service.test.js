import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateExpression, formatResult } from "../src/expression-service.js";

describe("expression-service", () => {
  it("evaluates arithmetic expressions", () => {
    assert.equal(evaluateExpression("2 + 3 * 4"), 14);
  });

  it("formats evaluated results", () => {
    assert.deepEqual(formatResult("10 / 2"), {
      expression: "10 / 2",
      result: 5,
    });
  });

  it("rejects empty expressions", () => {
    assert.throws(() => evaluateExpression(""), TypeError);
  });
});
