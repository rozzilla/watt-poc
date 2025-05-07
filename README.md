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

To run the benchmarks on your local machine for the different types of communication:

- for `IPC` run `npm run start > logs/tmp.log`, then `TYPE=ipc npm run test:performance`
- for `TCP` run `npm run start:tcp > logs/tmp.log`, then `TYPE=tcp npm run test:performance`
- for `SSL` run `npm run start:ssl > logs/tmp.log`, then `TYPE=ssl npm run test:performance`

### Result

Results can vary depending on the hardware specifications and many other variables, such as the background processes you're running at the same time. Those are the benchmarks from my machine:

```shell
IPC
2xx => 40547#
latency.avg => 244ms
latency.p50 => 193ms
latency.p90 => 373ms
latency.p99 => 1037ms
requests.avg => 4055/s
throughput.avg => 736KB
heap.size.total => 283MB
heap.size.used => 148MB
heap.size.new => 29MB
heap.size.old => 108MB
elu => 100%
cpu => 75%

TCP
2xx => 38459#
latency.avg => 250ms
latency.p50 => 169ms
latency.p90 => 402ms
latency.p99 => 2016ms
requests.avg => 3926/s
throughput.avg => 724KB
heap.size.total => 450MB
heap.size.used => 355MB
heap.size.new => 43MB
heap.size.old => 300MB
elu => 100%
cpu => 83%

SSL
2xx => 8658#
latency.avg => 792ms
latency.p50 => 515ms
latency.p90 => 1760ms
latency.p99 => 6020ms
requests.avg => 1052/s
throughput.avg => 218KB
heap.size.total => 220MB
heap.size.used => 109MB
heap.size.new => 23MB
heap.size.old => 74MB
elu => 100%
cpu => 16%
```
