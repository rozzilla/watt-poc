import { createServer } from "node:http";

let count = 0;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({ content: `from node path "${req.url}": ${count++}!` })
  );
});

server.listen({ port: 3002 })
