import fastify from "fastify";

export default function () {
  const app = fastify();

  app.get("/check", async () => {
    return { status: "ok2" };
  });

  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}
