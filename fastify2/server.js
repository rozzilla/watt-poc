import fastify from "fastify";
import { fetch } from "undici";
import Kafka from "node-rdkafka";

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
  console.log("started with v.", Kafka.librdkafkaVersion);

  const consumer = new Kafka.KafkaConsumer(
    {
      "group.id": "kafka",
      "metadata.broker.list": "localhost:9091",
    },
    {}
  );
  consumer.connect();
  consumer.on("ready", () => {
    console.log("ready");
    consumer.subscribe(["foo"]);
    consumer.consume();
  });
  console.log("consumer started");

  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
