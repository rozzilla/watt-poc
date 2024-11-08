import { createServer } from "node:http";

export function build() {
  let count = 0;

  const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ content: `from type1 path "${req.url}": ${count++}!` })
    );
  });

  return server;
}
