const pino = require("pino");

pino({ transport: { target: "pino/file" } });

// Calling the pino builder twice cause "FATAL ERROR: v8::FromJust Maybe value is Nothing"
pino({ transport: { target: "pino/file" } });

(async () => process.exit(1))();
