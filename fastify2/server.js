import fastify from "fastify";
import { fetch } from "undici";

const app = fastify();

app.get("/check", async () => {
  try {
    const host = "node3.plt.local";
    const check = await fetch(`http://${host}/check`);
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
