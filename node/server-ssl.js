import { createServer } from "node:https";
import { getHttpsConfig } from '../utils.mjs'

let count = 0;

const server = createServer(getHttpsConfig(), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({ content: `from node path "${req.url}": ${count++}!` })
  );
});

server.listen({ port: 4002 })
