const pino = require("pino");

function buildLoggerFactory() {
  return pino({
    transport: {
      target: "pino/file",
      level: "error",
      options: { destination: 1 },
    },
  });
}

const logger = buildLoggerFactory();

// Calling the pino builder twice cause "FATAL ERROR: v8::FromJust Maybe value is Nothing"
buildLoggerFactory();

(async () => {
  logger.error("logging!!!");
  process.exit(1);
})();
