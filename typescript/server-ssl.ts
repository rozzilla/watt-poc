import { createServer } from "node:https";
import { getHttpsConfig } from "../utils.mjs";

let count = 0;

const server = createServer(getHttpsConfig(), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      content: `from typescript path "${req.url}": ${count++}!`,
    })
  );
});

server.listen(4004);
