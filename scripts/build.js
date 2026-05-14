import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("dist", { recursive: true });
writeFileSync("dist/README.txt", "Vulnerable expression service build artifact.\n");

console.log("build ok");
