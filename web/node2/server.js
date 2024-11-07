import { createServer } from "node:http";

export function build() {
  let count = 0;

  const server = createServer((req, res) => {
    console.log("received request2", req.url);
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ content: `from node2 path "${req.url}": ${count++}!` })
    );
  });

  return server;
}
