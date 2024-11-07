import fastify from "fastify";

export function create () {
  const app = fastify();

  app.get(`/env`, async () => {
    return { status: "ok" };
  });

  return app;
}
