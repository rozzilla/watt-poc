import fastify from "fastify";
import { getHttpsConfig } from '../utils.mjs'

const app = fastify({ logger: true, https: getHttpsConfig() });

app.get("/live", async () => ({ status: "ok" }));

app.listen({ port: 4001 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
