import fastify from "fastify";

export default function () {
  const app = fastify();

  app.get(`/env`, async () => {
    return { status: "ok" };
  });

  return app;
}
