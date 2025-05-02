import { createServer } from "node:http";

let count = 0;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({ content: `from type4 path "${req.url}": ${count++}!` })
  );
});

server.listen(0);
