# watt-poc

POC of [Watt](https://platformatic.dev/docs/watt/overview) features and benchmarks

## Setup

Run the following commands:

- `npm run setup && npm run start`
- check `IPC` connection with `curl http://localhost:3043/tsfastify/ipc`
- check `TCP` connection with `curl http://localhost:3043/tsfastify/tcp`

To check `SSL` connection you should run `npm run start:ssl` and then `curl -k https://localhost:3043/tsfastify/ssl`.

## Features

### IPC service-to-service communication

Rather than communicate through TCP, with `watt` you can leverage IPC connections through Unix Sockets (see the [benchmarks section](#benchmarks) to analyze the performance improvements).

### Multithreading

Allowing your `watt` services to run with multiple threads is as easy as changing the `workers` parameter on the main `./watt.json`

### Metrics

When you run `watt`, you can very easily enable Open Telemetry metrics to monitor your whole system in real time. With [`watt-admin`](https://blog.platformatic.dev/introducing-watt-admin), you can see a dashboard showing real-time metrics.

### API Gateway

Leveraging `@platformatic/composer`, you can define a gateway entry point for your APIs through a simple JSON schema (see `./composer/platformatic.json`).

### Open API compatibility

Through `watt,` you can leverage the `openapi.url` property to automatically expose the service's Open API definition.

## Benchmarks

The benchmarks will compare service-to-service communication, where an endpoint (from the `tsfastify` service) will take care of getting a response from 4 other services (`fastify2`, `node3`, `type1`, `type4`). This number of requests is more than usual in a micro-service or a service-oriented architecture, and thanks to `watt`, we can compare the performance differences between `IPC` (exposed through the `/ipc` endpoint) versus `TCP` (on the `/tcp` route).

### TL;DR

To conduct testing on your local machine, please proceed to the following section. Alternatively, if you wish to review the results immediately, the current section contains all of the relevant information.

**Summary**

- 2xx => `4995#` (`SSL`) | `8223#` (`TCP`) | `40550#` (`IPC`)
- latency.average => `1617ms` (`SSL`) | `808ms` (`TCP`) | `243ms` (`IPC`)
- latency.p50 => `832ms` (`SSL`) | `181ms` (`TCP`) | `503ms` (`IPC`)
- latency.p90 => `5380ms` (`SSL`) | `1227ms` (`TCP`) | `188ms` (`IPC`)
- latency.p99 => `5397ms` (`SSL`) | `8076ms` (`TCP`) | `974ms` (`IPC`)
- requests.average => `519/s` (`SSL`) | `1044/s` (`TCP`) | `4055/s` (`IPC`)
- throughput.average => `87Kb` (`SSL`) | `194Kb` (`TCP`) | `660Kb` (`IPC`)
- Heap size total => `661Mb` (`SSL`) | `440Mb` (`TCP`) | `282Mb` (`IPC`)
- Heap size used => `503Mb` (`SSL`) | `239Mb` (`TCP`) | `99Mb` (`IPC`)
- Heap space new => `39Mb` (`SSL`) | `45Mb` (`TCP`) | `37Mb` (`IPC`)
- Heap space old => `446Mb` (`SSL`) | `179Mb` (`TCP`) | `48Mb` (`IPC`)
- ELU => `100%` (`SSL`) | `89.77%` (`TCP`) | `2.36%` (`IPC`)
- CPU => `93.66%` (`SSL`) | `66.15%` (`TCP`) | `60.80%` (`IPC`)

### Start

First of all, start `watt` with `npm run start > logs/tmp.log`, and after some time run `npm run test:performance:tcp` on a separate shell.

Then, stop the main `watt` process, start it again with `npm run start > logs/tmp.log`, followed by `npm run test:performance:ipc` command. Once the last command is completed, you'll be able to compare `TCP` and `IPC` benchmarks.

To run the benchmark for the `/ssl` endpoint, run first `npm run start:ssl > logs/tmp.log`, then the `npm run test:performance:ssl` command.

#### TCP

Output TCP benchmarks:

```json
{
  "url": "http://localhost:3043/tsfastify/tcp",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.02,
  "samples": 10,
  "start": "2025-05-06T13:23:50.953Z",
  "finish": "2025-05-06T13:24:00.977Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 2217,
  "resets": 0,
  "1xx": 0,
  "2xx": 8223,
  "3xx": 0,
  "4xx": 0,
  "5xx": 2217,
  "statusCodeStats": {
    "200": {
      "count": 8223
    },
    "500": {
      "count": 2217
    }
  },
  "latency": {
    "average": 808.35,
    "mean": 808.35,
    "stddev": 1889.61,
    "min": 34,
    "max": 8110,
    "p0_001": 34,
    "p0_01": 35,
    "p0_1": 48,
    "p1": 63,
    "p2_5": 65,
    "p10": 82,
    "p25": 100,
    "p50": 181,
    "p75": 409,
    "p90": 1227,
    "p97_5": 7964,
    "p99": 8076,
    "p99_9": 8095,
    "p99_99": 8109,
    "p99_999": 8110,
    "totalCount": 10440
  },
  "requests": {
    "average": 1044,
    "mean": 1044,
    "stddev": 252.98,
    "min": 608,
    "max": 1342,
    "total": 10440,
    "p0_001": 608,
    "p0_01": 608,
    "p0_1": 608,
    "p1": 608,
    "p2_5": 608,
    "p10": 608,
    "p25": 838,
    "p50": 1006,
    "p75": 1287,
    "p90": 1290,
    "p97_5": 1342,
    "p99": 1342,
    "p99_9": 1342,
    "p99_99": 1342,
    "p99_999": 1342,
    "sent": 11440
  },
  "throughput": {
    "average": 194387.2,
    "mean": 194387.2,
    "stddev": 67071.75,
    "min": 104756,
    "max": 331221,
    "total": 1943921,
    "p0_001": 104767,
    "p0_01": 104767,
    "p0_1": 104767,
    "p1": 104767,
    "p2_5": 104767,
    "p10": 104767,
    "p25": 143103,
    "p50": 170367,
    "p75": 220415,
    "p90": 278015,
    "p97_5": 331263,
    "p99": 331263,
    "p99_9": 331263,
    "p99_99": 331263,
    "p99_999": 331263
  }
}
```

Output TCP metrics:

```shell
process_resident_memory 1539 MB
nodejs_heap_size_total 440 MB
nodejs_heap_size_used 239 MB
nodejs_heap_space_size_used_new 45 MB
nodejs_heap_space_size_used_old 179 MB
nodejs_eventloop_utilization 89.77%
thread_cpu_percent_usage 66.15%
```

#### IPC

Output IPC benchmarks:

```json
{
  "url": "http://localhost:3043/tsfastify/ipc",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.04,
  "samples": 10,
  "start": "2025-05-06T13:33:35.435Z",
  "finish": "2025-05-06T13:33:45.472Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 0,
  "resets": 0,
  "1xx": 0,
  "2xx": 40550,
  "3xx": 0,
  "4xx": 0,
  "5xx": 0,
  "statusCodeStats": {
    "200": {
      "count": 40550
    }
  },
  "latency": {
    "average": 243.06,
    "mean": 243.06,
    "stddev": 174.41,
    "min": 4,
    "max": 1037,
    "p0_001": 4,
    "p0_01": 20,
    "p0_1": 35,
    "p1": 72,
    "p2_5": 90,
    "p10": 120,
    "p25": 154,
    "p50": 188,
    "p75": 243,
    "p90": 455,
    "p97_5": 835,
    "p99": 974,
    "p99_9": 1026,
    "p99_99": 1035,
    "p99_999": 1037,
    "totalCount": 40550
  },
  "requests": {
    "average": 4055.6,
    "mean": 4055.6,
    "stddev": 2066.03,
    "min": 842,
    "max": 6580,
    "total": 40550,
    "p0_001": 842,
    "p0_01": 842,
    "p0_1": 842,
    "p1": 842,
    "p2_5": 842,
    "p10": 842,
    "p25": 2199,
    "p50": 4167,
    "p75": 5727,
    "p90": 6323,
    "p97_5": 6583,
    "p99": 6583,
    "p99_9": 6583,
    "p99_99": 6583,
    "p99_999": 6583,
    "sent": 41550
  },
  "throughput": {
    "average": 660992,
    "mean": 660992,
    "stddev": 336693.78,
    "min": 137246,
    "max": 1072540,
    "total": 6609650,
    "p0_001": 137343,
    "p0_01": 137343,
    "p0_1": 137343,
    "p1": 137343,
    "p2_5": 137343,
    "p10": 137343,
    "p25": 358655,
    "p50": 679423,
    "p75": 933375,
    "p90": 1030655,
    "p97_5": 1073151,
    "p99": 1073151,
    "p99_9": 1073151,
    "p99_99": 1073151,
    "p99_999": 1073151
  }
}
```

Output IPC metrics:

```shell
process_resident_memory 2287 MB
nodejs_heap_size_total 282 MB
nodejs_heap_size_used 99 MB
nodejs_heap_space_size_used_new 37 MB
nodejs_heap_space_size_used_old 48 MB
nodejs_eventloop_utilization 2.36%
thread_cpu_percent_usage 60.80%
```

#### SSL

Output SSL benchmarks:

```json
{
  "url": "https://localhost:3043/tsfastify/ssl",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.06,
  "samples": 10,
  "start": "2025-05-06T13:25:22.552Z",
  "finish": "2025-05-06T13:25:32.612Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 200,
  "resets": 0,
  "1xx": 0,
  "2xx": 4995,
  "3xx": 0,
  "4xx": 0,
  "5xx": 200,
  "statusCodeStats": {
    "200": {
      "count": 4995
    },
    "500": {
      "count": 200
    }
  },
  "latency": {
    "average": 1617.81,
    "mean": 1617.81,
    "stddev": 1743.05,
    "min": 723,
    "max": 8039,
    "p0_001": 723,
    "p0_01": 723,
    "p0_1": 723,
    "p1": 723,
    "p2_5": 724,
    "p10": 730,
    "p25": 749,
    "p50": 832,
    "p75": 928,
    "p90": 5380,
    "p97_5": 5389,
    "p99": 5397,
    "p99_9": 5540,
    "p99_99": 8039,
    "p99_999": 8039,
    "totalCount": 5195
  },
  "requests": {
    "average": 519.5,
    "mean": 519.5,
    "stddev": 541.11,
    "min": 118,
    "max": 1619,
    "total": 5195,
    "p0_001": 0,
    "p0_01": 0,
    "p0_1": 0,
    "p1": 0,
    "p2_5": 0,
    "p10": 0,
    "p25": 0,
    "p50": 118,
    "p75": 883,
    "p90": 893,
    "p97_5": 1619,
    "p99": 1619,
    "p99_9": 1619,
    "p99_99": 1619,
    "p99_999": 1619,
    "sent": 6195
  },
  "throughput": {
    "average": 87064,
    "mean": 87064,
    "stddev": 87941.44,
    "min": 33394,
    "max": 264017,
    "total": 870652,
    "p0_001": 0,
    "p0_01": 0,
    "p0_1": 0,
    "p1": 0,
    "p2_5": 0,
    "p10": 0,
    "p25": 0,
    "p50": 33407,
    "p75": 148095,
    "p90": 151039,
    "p97_5": 264191,
    "p99": 264191,
    "p99_9": 264191,
    "p99_99": 264191,
    "p99_999": 264191
  }
}
```

Output SSL metrics:

```shell
process_resident_memory 2152 MB
nodejs_heap_size_total 661 MB
nodejs_heap_size_used 503 MB
nodejs_heap_space_size_used_new 39 MB
nodejs_heap_space_size_used_old 446 MB
nodejs_eventloop_utilization 100.00%
thread_cpu_percent_usage 93.66%
```
