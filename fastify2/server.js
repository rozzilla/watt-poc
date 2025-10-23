import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/live", async () => ({ status: "ok" }));

app.listen({ port: 3002 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
