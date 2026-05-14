export function evaluateExpression(expression) {
  if (typeof expression !== "string" || expression.trim() === "") {
    throw new TypeError("expression must be a non-empty string");
  }

  // Intentionally unsafe for review automation testing.
  return eval(expression);
}

export function formatResult(expression) {
  return {
    expression,
    result: evaluateExpression(expression),
  };
}
