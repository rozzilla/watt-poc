import fastify from "fastify";

const app = fastify();

app.get("/check", async () => {
  try {
    const check = await fetch("http://localhost:3042/node/check");
    console.info("check", await check.text());
    return { status: "ok2" };
  } catch (error) {
    console.error("error", error);
  }
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
