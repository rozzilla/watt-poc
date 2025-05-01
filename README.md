# watt-poc

POC of Watt features

## Setup

Run the following commands:

- `npm run setup && npm run start`
- check that the service is up and running with `curl http://localhost:3043/typescript`
- check all the services all properly responding on `IPC` with `curl http://localhost:3043/tsfastify/ipc`
- check all the services all properly responding on `TCP` with `curl http://localhost:3043/tsfastify/tcp`

## Benchmarks

The benchmarks will compare service to service communication, where an endpoint (from the `tsfastify` service) will take care of getting a response from 4 other services (`fastify2`, `node3`, `type1`, `type4`). This number of requests is more than usual in a micro-service or a service oriented architecture, and thanks to `watt`, we can compare the performance differences between `IPC` communication (exposed through the `/ipc`) versus `TCP` (on the `/tcp` route).

### TL;DR

If you want to test directly on your machine, move to the next section. Otherwise, to jump directly into the results, that's the right place!

**Summary**

- 2xx => `7276#` on `TCP` | `42269#` on `IPC`
- 5xx => `2244#` on `TCP` | `0#` on `IPC`
- latency.average => `829ms` on `TCP` | `234ms` on `IPC`
- latency.p90 => `1112ms` on `TCP` | `321ms` on `IPC`
- latency.p99 => `8010ms` on `TCP` | `234ms` on `IPC`
- requests.average => `952/s` on `TCP` | `4227/s` on `IPC`
- throughput.average => `180Kb` on `TCP` | `689Kb` on `IPC`

### Start

First of all, start the service with:
`npm run build && npm run start > log`

Then run the command as described below.

#### TCP

Service communicating through `TCP` => `npx autocannon -c 100 -d 10 -p 10 http://localhost:3043/tsfastify/tcp`

```json
{
  "url": "http://localhost:3043/tsfastify/tcp",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.03,
  "samples": 10,
  "start": "2025-05-01T10:28:33.968Z",
  "finish": "2025-05-01T10:28:43.997Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 2244,
  "resets": 0,
  "1xx": 0,
  "2xx": 7276,
  "3xx": 0,
  "4xx": 0,
  "5xx": 2244,
  "statusCodeStats": { "200": { "count": 7276 }, "500": { "count": 2244 } },
  "latency": {
    "average": 829.03,
    "mean": 829.03,
    "stddev": 1894.54,
    "min": 7,
    "max": 8088,
    "p0_001": 7,
    "p0_01": 7,
    "p0_1": 8,
    "p1": 24,
    "p2_5": 37,
    "p10": 50,
    "p25": 66,
    "p50": 122,
    "p75": 413,
    "p90": 2153,
    "p97_5": 7970,
    "p99": 8010,
    "p99_9": 8039,
    "p99_99": 8088,
    "p99_999": 8088,
    "totalCount": 9520
  },
  "requests": {
    "average": 952,
    "mean": 952,
    "stddev": 173.1,
    "min": 622,
    "max": 1184,
    "total": 9520,
    "p0_001": 622,
    "p0_01": 622,
    "p0_1": 622,
    "p1": 622,
    "p2_5": 622,
    "p10": 622,
    "p25": 833,
    "p50": 987,
    "p75": 1081,
    "p90": 1112,
    "p97_5": 1184,
    "p99": 1184,
    "p99_9": 1184,
    "p99_99": 1184,
    "p99_999": 1184,
    "sent": 10520
  },
  "throughput": {
    "average": 180147.2,
    "mean": 180147.2,
    "stddev": 51853.77,
    "min": 105861,
    "max": 300521,
    "total": 1801573,
    "p0_001": 105919,
    "p0_01": 105919,
    "p0_1": 105919,
    "p1": 105919,
    "p2_5": 105919,
    "p10": 105919,
    "p25": 143999,
    "p50": 176511,
    "p75": 204543,
    "p90": 215807,
    "p97_5": 300543,
    "p99": 300543,
    "p99_9": 300543,
    "p99_99": 300543,
    "p99_999": 300543
  }
}
```

#### IPC

Service communicating through `IPC` => `npx autocannon -c 100 -d 10 -p 10 http://localhost:3043/tsfastify/ipc`

```json
{
  "url": "http://localhost:3043/tsfastify/ipc",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.04,
  "samples": 10,
  "start": "2025-05-01T10:29:24.842Z",
  "finish": "2025-05-01T10:29:34.883Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 0,
  "resets": 0,
  "1xx": 0,
  "2xx": 42269,
  "3xx": 0,
  "4xx": 0,
  "5xx": 0,
  "statusCodeStats": { "200": { "count": 42269 } },
  "latency": {
    "average": 234.13,
    "mean": 234.13,
    "stddev": 81.29,
    "min": 2,
    "max": 652,
    "p0_001": 2,
    "p0_01": 3,
    "p0_1": 50,
    "p1": 89,
    "p2_5": 103,
    "p10": 147,
    "p25": 191,
    "p50": 226,
    "p75": 261,
    "p90": 321,
    "p97_5": 432,
    "p99": 617,
    "p99_9": 650,
    "p99_99": 652,
    "p99_999": 652,
    "totalCount": 42269
  },
  "requests": {
    "average": 4227.7,
    "mean": 4227.7,
    "stddev": 820.42,
    "min": 2001,
    "max": 5202,
    "total": 42269,
    "p0_001": 2001,
    "p0_01": 2001,
    "p0_1": 2001,
    "p1": 2001,
    "p2_5": 2001,
    "p10": 2001,
    "p25": 4095,
    "p50": 4395,
    "p75": 4627,
    "p90": 4815,
    "p97_5": 5203,
    "p99": 5203,
    "p99_9": 5203,
    "p99_99": 5203,
    "p99_999": 5203,
    "sent": 43269
  },
  "throughput": {
    "average": 689036.8,
    "mean": 689036.8,
    "stddev": 133694.6,
    "min": 326163,
    "max": 847926,
    "total": 6889847,
    "p0_001": 326399,
    "p0_01": 326399,
    "p0_1": 326399,
    "p1": 326399,
    "p2_5": 326399,
    "p10": 326399,
    "p25": 667647,
    "p50": 716287,
    "p75": 754175,
    "p90": 784895,
    "p97_5": 848383,
    "p99": 848383,
    "p99_9": 848383,
    "p99_99": 848383,
    "p99_999": 848383
  }
}
```
