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
2xx => 39325#
5xx => 0#
latency.avg => 251ms
latency.p50 => 192ms
latency.p90 => 303ms
latency.p99 => 1987ms
requests.avg => 3933/s
throughput.avg => 714KB
heap.size.total => 398MB
heap.size.used => 182MB
heap.size.new => 36MB
heap.size.old => 134MB
thread.cpu.usage => 86%

TCP
2xx => 26683#
5xx => 1698#
latency.avg => 319ms
latency.p50 => 226ms
latency.p90 => 548ms
latency.p99 => 1915ms
requests.avg => 2839/s
throughput.avg => 540KB
heap.size.total => 533MB
heap.size.used => 454MB
heap.size.new => 59MB
heap.size.old => 379MB
thread.cpu.usage => 100%

SSL
2xx => 8778#
5xx => 1960#
latency.avg => 1225ms
latency.p50 => 437ms
latency.p90 => 3865ms
latency.p99 => 13706ms
requests.avg => 1074/s
throughput.avg => 223KB
heap.size.total => 266MB
heap.size.used => 167MB
heap.size.new => 38MB
heap.size.old => 116MB
thread.cpu.usage => 1%
```
