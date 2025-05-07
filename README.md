# watt-poc

POC of [Watt](https://www.platformatichq.com/watt) features and benchmarks ([documentation](https://platformatic.dev/docs/watt/overview)).

## Setup

Run `npm run setup && npm run start:all`, wait for the log `Platformatic is now listening at http://127.0.0.1:3043`, then can check `IPC` connection with `curl http://localhost:3043/ipc`, `curl http://localhost:3043/tcp` for `TCP` and `curl http://localhost:3043/ssl` for `SSL`.

## Features

### IPC service-to-service communication

Rather than communicate through TCP, with `watt` you can leverage IPC connections through Unix Sockets (see the [benchmarks section](#benchmarks) to analyze the performance improvements).

### Multithreading

Allowing your `watt` services to run with multiple threads is as easy as changing the `workers` parameter on the main `./watt.json`

### Metrics

When you run `watt`, you can very easily enable Open Telemetry metrics to monitor your whole system in real time. With [`watt-admin`](https://blog.platformatic.dev/introducing-watt-admin), you can see a dashboard showing real-time metrics.

### API Gateway

Leveraging `@platformatic/composer`, you can define a gateway entry point for your APIs through a simple JSON schema ([documentation](https://docs.platformatic.dev/docs/composer/overview)).

### Open API compatibility

Through `watt` you have automatically an Open API schema that reflect your api. You can see it while the app is running at `http://127.0.0.1:3043/documentation`.

## Benchmarks

The benchmarks will compare service-to-service communication, where an endpoint (from the `tsfastify` service) will take care of getting a response from 4 other services (`fastify`, `node`, `ts2`, `typescript`). This number of requests is more than usual in a micro-service or a service-oriented architecture, and thanks to `watt`, we can compare the performance differences between `IPC` (exposed through the `/ipc` endpoint) versus `TCP` (on the `/tcp` route), and `SSL` (on the `/ssl` route).

To run the benchmarks on your local machine for the different types of communication just wait for the `npm run test:performance` to be completed (it takes ~1 minute), then analyze the `logs`.

### Result

Results can vary depending on the hardware specifications and many other variables, such as the background processes you're running at the same time. Those are the benchmarks from my machine:

```shell
IPC
2xx => 39008#
latency.avg => 254ms
latency.p50 => 214ms
latency.p90 => 334ms
latency.p99 => 613ms
requests.avg => 3901/s
throughput.avg => 709KB
heap.size.total => 315MB
heap.size.used => 97MB
heap.size.new => 14MB
heap.size.old => 71MB
thread.cpu.usage => 84%

TCP
2xx => 24394#
latency.avg => 334ms
latency.p50 => 245ms
latency.p90 => 537ms
latency.p99 => 1826ms
requests.avg => 2562/s
throughput.avg => 483KB
heap.size.total => 470MB
heap.size.used => 171MB
heap.size.new => 19MB
heap.size.old => 136MB
thread.cpu.usage => 100%

SSL
2xx => 10923#
latency.avg => 886ms
latency.p50 => 368ms
latency.p90 => 2049ms
latency.p99 => 6563ms
requests.avg => 1119/s
throughput.avg => 207KB
heap.size.total => 308MB
heap.size.used => 174MB
heap.size.new => 21MB
heap.size.old => 140MB
thread.cpu.usage => 98%
```
