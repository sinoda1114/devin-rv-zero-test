export function titleCase(value) {
  assertString(value);

  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
}

export function kebabCase(value) {
  assertString(value);

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assertString(value) {
  if (typeof value !== "string") {
    throw new TypeError("value must be a string");
  }
}
