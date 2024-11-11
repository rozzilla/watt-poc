import { createServer } from "node:http";
import esMain from "es-main";

export function build() {
  let count = 0;

  const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ content: `from type4 path "${req.url}": ${count++}!` })
    );
  });

  return server;
}

if (esMain(import.meta)) {
  build().listen(0, function () {
    console.log(`Server listening on http://localhost:${this.address().port}`);
  })
}
