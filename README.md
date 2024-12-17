# watt-poc

POC of Watt features

## Setup

Run the following commands:

- `npm run setup && npm run start`
- check that the service is up and running with `curl http://localhost:3042/typescript`

## Benchmarks

Service with `build` => `npx autocannon -c 100 -d 10 -p 10 http://localhost:3042/ts2`:

- avg latency 234ms
- avg req/sec 4233

Service with `.listen` => `npx autocannon -c 100 -d 10 -p 10 http://localhost:3042/typescript`:

- avg latency 352ms
- avg req/sec 2809
