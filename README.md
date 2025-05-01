# watt-poc

POC of Watt features

## Setup

Run the following commands:

- `npm run setup && npm run start`
- check all the services all properly responding on `IPC` with `curl http://localhost:3043/tsfastify/ipc`
- check all the services all properly responding on `TCP` with `curl http://localhost:3043/tsfastify/tcp`

## Benchmarks

The benchmarks will compare service to service communication, where an endpoint (from the `tsfastify` service) will take care of getting a response from 4 other services (`fastify2`, `node3`, `type1`, `type4`). This number of requests is more than usual in a micro-service or a service oriented architecture, and thanks to `watt`, we can compare the performance differences between `IPC` communication (exposed through the `/ipc`) versus `TCP` (on the `/tcp` route).

### TL;DR

To conduct testing on your local machine, please proceed to the following section. Alternatively, if you wish to review the results immediately, the current section contains all of the relevant information.

**Summary**

- 2xx => `7436#` on `TCP` | `40749#` on `IPC`
- 5xx => `1269#` on `TCP` | `0#` on `IPC`
- latency.average => `936ms` on `TCP` | `241ms` on `IPC`
- latency.p90 => `1459ms` on `TCP` | `349ms` on `IPC`
- latency.p99 => `8162ms` on `TCP` | `496ms` on `IPC`
- requests.average => `870/s` on `TCP` | `4075/s` on `IPC`
- throughput.average => `156Kb` on `TCP` | `664Kb` on `IPC`
- Heap size total => `445Mb` on `TCP` | `215Mb` on `IPC`
- Heap size used => `127Mb` on `TCP` | `172Mb` on `IPC`
- ELU => `100%` on `TCP` | `74%` on `IPC`
- CPU => `78%` on `TCP` | `52%` on `IPC`

### Start

First of all, start `watt` with:
`npm run build && npm run start > log`

Then, run separately the `npm run test:performance` command, and wait for the results of both the `TCP` and `IPC` routes.

**Bonus point**: [Follow this guideline](https://blog.platformatic.dev/introducing-watt-admin) to run `watt-admin` and have a live overview on your service metrics during the performance tests.

#### TCP

Service communicating through `TCP` => `npm run test:performance:tcp`

```json
{
  "url": "http://localhost:3043/tsfastify/tcp",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.03,
  "samples": 10,
  "start": "2025-05-01T15:34:08.050Z",
  "finish": "2025-05-01T15:34:18.083Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 1269,
  "resets": 0,
  "1xx": 0,
  "2xx": 7436,
  "3xx": 0,
  "4xx": 0,
  "5xx": 1269,
  "statusCodeStats": {
    "200": {
      "count": 7436
    },
    "500": {
      "count": 1269
    }
  },
  "latency": {
    "average": 936.22,
    "mean": 936.22,
    "stddev": 1484.54,
    "min": 181,
    "max": 9197,
    "p0_001": 181,
    "p0_01": 181,
    "p0_1": 195,
    "p1": 316,
    "p2_5": 320,
    "p10": 420,
    "p25": 478,
    "p50": 587,
    "p75": 692,
    "p90": 1459,
    "p97_5": 8029,
    "p99": 8162,
    "p99_9": 8173,
    "p99_99": 9197,
    "p99_999": 9197,
    "totalCount": 8705
  },
  "requests": {
    "average": 870.5,
    "mean": 870.5,
    "stddev": 313.22,
    "min": 399,
    "max": 1541,
    "total": 8705,
    "p0_001": 399,
    "p0_01": 399,
    "p0_1": 399,
    "p1": 399,
    "p2_5": 399,
    "p10": 399,
    "p25": 642,
    "p50": 906,
    "p75": 1032,
    "p90": 1112,
    "p97_5": 1541,
    "p99": 1541,
    "p99_9": 1541,
    "p99_99": 1541,
    "p99_999": 1541,
    "sent": 9705
  },
  "throughput": {
    "average": 156684.8,
    "mean": 156684.8,
    "stddev": 58696.25,
    "min": 87691,
    "max": 301035,
    "total": 1566806,
    "p0_001": 87743,
    "p0_01": 87743,
    "p0_1": 87743,
    "p1": 87743,
    "p2_5": 87743,
    "p10": 87743,
    "p25": 107839,
    "p50": 150015,
    "p75": 182015,
    "p90": 190847,
    "p97_5": 301055,
    "p99": 301055,
    "p99_9": 301055,
    "p99_99": 301055,
    "p99_999": 301055
  }
}
```

Metrics output:

```shell
process_resident_memory_bytes 1405665280
nodejs_heap_size_total_bytes 445775872
nodejs_heap_size_used_bytes 127305552
nodejs_heap_space_size_used_bytes{space="new"} 9993448
nodejs_heap_space_size_used_bytes{space="old"} 104161192
nodejs_eventloop_utilization 1
thread_cpu_percent_usage 78.33070063356756
```

#### IPC

Service communicating through `IPC` => `npm run test:performance:ipc`

```json
{
  "url": "http://localhost:3043/tsfastify/ipc",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.04,
  "samples": 10,
  "start": "2025-05-01T15:34:18.905Z",
  "finish": "2025-05-01T15:34:28.940Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 0,
  "resets": 0,
  "1xx": 0,
  "2xx": 40749,
  "3xx": 0,
  "4xx": 0,
  "5xx": 0,
  "statusCodeStats": {
    "200": {
      "count": 40749
    }
  },
  "latency": {
    "average": 241.38,
    "mean": 241.38,
    "stddev": 74.59,
    "min": 8,
    "max": 517,
    "p0_001": 8,
    "p0_01": 9,
    "p0_1": 55,
    "p1": 88,
    "p2_5": 105,
    "p10": 169,
    "p25": 197,
    "p50": 225,
    "p75": 274,
    "p90": 349,
    "p97_5": 422,
    "p99": 496,
    "p99_9": 515,
    "p99_99": 517,
    "p99_999": 517,
    "totalCount": 40749
  },
  "requests": {
    "average": 4075.7,
    "mean": 4075.7,
    "stddev": 692.18,
    "min": 2351,
    "max": 4721,
    "total": 40749,
    "p0_001": 2351,
    "p0_01": 2351,
    "p0_1": 2351,
    "p1": 2351,
    "p2_5": 2351,
    "p10": 2351,
    "p25": 3941,
    "p50": 4251,
    "p75": 4535,
    "p90": 4687,
    "p97_5": 4723,
    "p99": 4723,
    "p99_9": 4723,
    "p99_99": 4723,
    "p99_999": 4723,
    "sent": 41749
  },
  "throughput": {
    "average": 664204.81,
    "mean": 664204.81,
    "stddev": 112777.24,
    "min": 383213,
    "max": 769523,
    "total": 6642087,
    "p0_001": 383231,
    "p0_01": 383231,
    "p0_1": 383231,
    "p1": 383231,
    "p2_5": 383231,
    "p10": 383231,
    "p25": 642559,
    "p50": 693247,
    "p75": 738815,
    "p90": 763903,
    "p97_5": 769535,
    "p99": 769535,
    "p99_9": 769535,
    "p99_99": 769535,
    "p99_999": 769535
  }
}
```

Metrics output:

```shell
process_resident_memory_bytes 1479540736
nodejs_heap_size_total_bytes 215433216
nodejs_heap_size_used_bytes 172630056
nodejs_heap_space_size_used_bytes{space="new"} 12066392
nodejs_heap_space_size_used_bytes{space="old"} 147681888
nodejs_eventloop_utilization 0.7428378495133832
thread_cpu_percent_usage 52.28364997175286
```
