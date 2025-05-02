# watt-poc

POC of [Watt](https://platformatic.dev/docs/watt/overview) features and benchmarks

## Setup

Run the following commands:

- `npm run setup && npm run start`
- check `IPC` connection with `curl http://localhost:3043/tsfastify/ipc`
- check `TCP` connection with `curl http://localhost:3043/tsfastify/tcp`

## Benchmarks

The benchmarks will compare service-to-service communication, where an endpoint (from the `tsfastify` service) will take care of getting a response from 4 other services (`fastify2`, `node3`, `type1`, `type4`). This number of requests is more than usual in a micro-service or a service-oriented architecture, and thanks to `watt`, we can compare the performance differences between `IPC` (exposed through the `/ipc` endpoint) versus `TCP` (on the `/tcp` route).

### TL;DR

To conduct testing on your local machine, please proceed to the following section. Alternatively, if you wish to review the results immediately, the current section contains all of the relevant information.

**Summary**

- 2xx => `8106#` on `TCP` | `31580#` on `IPC`
- 5xx => `1412#` on `TCP` | `0#` on `IPC`
- latency.average => `901ms` on `TCP` | `312ms` on `IPC`
- latency.p90 => `2149ms` on `TCP` | `503ms` on `IPC`
- latency.p99 => `7961ms` on `TCP` | `599ms` on `IPC`
- requests.average => `951/s` on `TCP` | `3158/s` on `IPC`
- throughput.average => `171Kb` on `TCP` | `514Kb` on `IPC`
- Heap size total => `444Mb` on `TCP` | `258Mb` on `IPC`
- Heap size used => `356Mb` on `TCP` | `107Mb` on `IPC`
- Heap space new => `49Mb` on `TCP` | `44Mb` on `IPC`
- Heap space old => `293Mb` on `TCP` | `51Mb` on `IPC`
- ELU => `100%` on `TCP` | `64%` on `IPC`
- CPU => `91%` on `TCP` | `55%` on `IPC`

### Start

First of all, start `watt` with `npm run start > logs/tmp.log`, and run `npm run test:performance:tcp` on a separate shell.

Then, stop the main `watt` process, start it again with `npm run start > logs/tmp.log`, followed by `npm run test:performance:ipc` command. Once the last command is completed, you'll be able to compare `TCP` and `IPC` benchmarks.

**Bonus point**: [Follow this guideline](https://blog.platformatic.dev/introducing-watt-admin) to run `watt-admin` and have a live overview on your service metrics during the performance tests.

#### TCP

Output performance test

```json
{
  "url": "http://localhost:3043/tsfastify/tcp",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.03,
  "samples": 10,
  "start": "2025-05-02T14:50:39.485Z",
  "finish": "2025-05-02T14:50:49.513Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 1412,
  "resets": 0,
  "1xx": 0,
  "2xx": 8106,
  "3xx": 0,
  "4xx": 0,
  "5xx": 1412,
  "statusCodeStats": {
    "200": {
      "count": 8106
    },
    "500": {
      "count": 1412
    }
  },
  "latency": {
    "average": 901.13,
    "mean": 901.13,
    "stddev": 1902.1,
    "min": 30,
    "max": 9363,
    "p0_001": 30,
    "p0_01": 30,
    "p0_1": 35,
    "p1": 47,
    "p2_5": 60,
    "p10": 86,
    "p25": 110,
    "p50": 201,
    "p75": 471,
    "p90": 2149,
    "p97_5": 7932,
    "p99": 7961,
    "p99_9": 8802,
    "p99_99": 9363,
    "p99_999": 9363,
    "totalCount": 9518
  },
  "requests": {
    "average": 951.8,
    "mean": 951.8,
    "stddev": 370.44,
    "min": 338,
    "max": 1577,
    "total": 9518,
    "p0_001": 338,
    "p0_01": 338,
    "p0_1": 338,
    "p1": 338,
    "p2_5": 338,
    "p10": 338,
    "p25": 660,
    "p50": 927,
    "p75": 1277,
    "p90": 1328,
    "p97_5": 1577,
    "p99": 1577,
    "p99_9": 1577,
    "p99_99": 1577,
    "p99_999": 1577,
    "sent": 10518
  },
  "throughput": {
    "average": 171731.2,
    "mean": 171731.2,
    "stddev": 64742.54,
    "min": 89474,
    "max": 290899,
    "total": 1717455,
    "p0_001": 89535,
    "p0_01": 89535,
    "p0_1": 89535,
    "p1": 89535,
    "p2_5": 89535,
    "p10": 89535,
    "p25": 108671,
    "p50": 153215,
    "p75": 222591,
    "p90": 236287,
    "p97_5": 291071,
    "p99": 291071,
    "p99_9": 291071,
    "p99_99": 291071,
    "p99_999": 291071
  }
}
```

Metrics output:

```shell
process_resident_memory 1729 MB
nodejs_heap_size_total 444 MB
nodejs_heap_size_used 356 MB
nodejs_heap_space_size_used_new 49 MB
nodejs_heap_space_size_used_old 293 MB
nodejs_eventloop_utilization 100.00%
thread_cpu_percent_usage 91.31%
```

#### IPC

Output performance test

```json
{
  "url": "http://localhost:3043/tsfastify/ipc",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.04,
  "samples": 10,
  "start": "2025-05-02T14:51:34.471Z",
  "finish": "2025-05-02T14:51:44.507Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 0,
  "resets": 0,
  "1xx": 0,
  "2xx": 31580,
  "3xx": 0,
  "4xx": 0,
  "5xx": 0,
  "statusCodeStats": {
    "200": {
      "count": 31580
    }
  },
  "latency": {
    "average": 312.38,
    "mean": 312.38,
    "stddev": 124.71,
    "min": 5,
    "max": 842,
    "p0_001": 5,
    "p0_01": 15,
    "p0_1": 25,
    "p1": 68,
    "p2_5": 107,
    "p10": 163,
    "p25": 219,
    "p50": 299,
    "p75": 380,
    "p90": 503,
    "p97_5": 580,
    "p99": 599,
    "p99_9": 630,
    "p99_99": 842,
    "p99_999": 842,
    "totalCount": 31580
  },
  "requests": {
    "average": 3158.4,
    "mean": 3158.4,
    "stddev": 950.16,
    "min": 1511,
    "max": 4987,
    "total": 31580,
    "p0_001": 1511,
    "p0_01": 1511,
    "p0_1": 1511,
    "p1": 1511,
    "p2_5": 1511,
    "p10": 1511,
    "p25": 2657,
    "p50": 2849,
    "p75": 3495,
    "p90": 4547,
    "p97_5": 4987,
    "p99": 4987,
    "p99_9": 4987,
    "p99_99": 4987,
    "p99_999": 4987,
    "sent": 32580
  },
  "throughput": {
    "average": 514732.8,
    "mean": 514732.8,
    "stddev": 154847.22,
    "min": 246293,
    "max": 812881,
    "total": 5147540,
    "p0_001": 246399,
    "p0_01": 246399,
    "p0_1": 246399,
    "p1": 246399,
    "p2_5": 246399,
    "p10": 246399,
    "p25": 433151,
    "p50": 464639,
    "p75": 569855,
    "p90": 740863,
    "p97_5": 813055,
    "p99": 813055,
    "p99_9": 813055,
    "p99_99": 813055,
    "p99_999": 813055
  }
}
```

Metrics output:

```shell
process_resident_memory 2016 MB
nodejs_heap_size_total 258 MB
nodejs_heap_size_used 107 MB
nodejs_heap_space_size_used_new 44 MB
nodejs_heap_space_size_used_old 51 MB
nodejs_eventloop_utilization 63.98%
thread_cpu_percent_usage 54.90%
```
