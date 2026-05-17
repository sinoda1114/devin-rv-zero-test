import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("dist", { recursive: true });
writeFileSync("dist/README.txt", "Initial app build artifact.\n");

console.log("build ok");
