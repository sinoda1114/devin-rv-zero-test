import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { kebabCase, titleCase } from "../src/string-utils.js";

describe("string-utils", () => {
  it("converts text to title case", () => {
    assert.equal(titleCase("hello devin review"), "Hello Devin Review");
  });

  it("collapses extra whitespace in title case", () => {
    assert.equal(titleCase("  hello   world  "), "Hello World");
  });

  it("converts text to kebab case", () => {
    assert.equal(kebabCase("Hello Devin Review!"), "hello-devin-review");
  });

  it("rejects non-string input", () => {
    assert.throws(() => titleCase(null), TypeError);
  });
});
