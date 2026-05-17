export function evaluateExpression(expression) {
  if (typeof expression !== "string" || expression.trim() === "") {
    throw new TypeError("expression must be a non-empty string");
  }

  // Safe arithmetic-only evaluator (recursive descent parser).
  // Supports: + - * / ( ) and numeric literals (including decimals).
  const tokens = tokenize(expression);
  const parser = { tokens, pos: 0 };
  const value = parseExpression(parser);
  if (parser.pos !== tokens.length) {
    throw new SyntaxError(`unexpected token at position ${parser.pos}`);
  }
  return value;
}

function tokenize(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "(" || ch === ")") {
      tokens.push({ type: ch });
      i += 1;
      continue;
    }
    if ((ch >= "0" && ch <= "9") || ch === ".") {
      let j = i;
      let sawDot = false;
      while (j < input.length) {
        const c = input[j];
        if (c >= "0" && c <= "9") {
          j += 1;
        } else if (c === "." && !sawDot) {
          sawDot = true;
          j += 1;
        } else {
          break;
        }
      }
      const numStr = input.slice(i, j);
      const num = Number(numStr);
      if (!Number.isFinite(num)) {
        throw new SyntaxError(`invalid number: ${numStr}`);
      }
      tokens.push({ type: "num", value: num });
      i = j;
      continue;
    }
    throw new SyntaxError(`unexpected character '${ch}' at position ${i}`);
  }
  return tokens;
}

function peek(parser) {
  return parser.tokens[parser.pos];
}

function consume(parser) {
  return parser.tokens[parser.pos++];
}

function parseExpression(parser) {
  let left = parseTerm(parser);
  while (peek(parser) && (peek(parser).type === "+" || peek(parser).type === "-")) {
    const op = consume(parser).type;
    const right = parseTerm(parser);
    left = op === "+" ? left + right : left - right;
  }
  return left;
}

function parseTerm(parser) {
  let left = parseFactor(parser);
  while (peek(parser) && (peek(parser).type === "*" || peek(parser).type === "/")) {
    const op = consume(parser).type;
    const right = parseFactor(parser);
    left = op === "*" ? left * right : left / right;
  }
  return left;
}

function parseFactor(parser) {
  const tok = peek(parser);
  if (!tok) {
    throw new SyntaxError("unexpected end of expression");
  }
  if (tok.type === "+" || tok.type === "-") {
    const op = consume(parser).type;
    const value = parseFactor(parser);
    return op === "-" ? -value : value;
  }
  if (tok.type === "(") {
    consume(parser);
    const value = parseExpression(parser);
    const next = consume(parser);
    if (!next || next.type !== ")") {
      throw new SyntaxError("missing closing parenthesis");
    }
    return value;
  }
  if (tok.type === "num") {
    consume(parser);
    return tok.value;
  }
  throw new SyntaxError(`unexpected token '${tok.type}'`);
}

export function formatResult(expression) {
  return {
    expression,
    result: evaluateExpression(expression),
  };
}
