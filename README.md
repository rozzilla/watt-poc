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

If you want to test directly on your machine, move to the next section. Otherwise, to jump directly into the results, that's the right place!

**Summary**

- 2xx => `7775#` on `TCP` | `41237#` on `IPC`
- 5xx => `2333#` on `TCP` | `0#` on `IPC`
- latency.average => `818ms` on `TCP` | `240ms` on `IPC`
- latency.p90 => `2173ms` on `TCP` | `312ms` on `IPC`
- latency.p99 => `7969ms` on `TCP` | `552ms` on `IPC`
- requests.average => `1010/s` on `TCP` | `4124/s` on `IPC`
- throughput.average => `191Kb` on `TCP` | `672Kb` on `IPC`

### Start

First of all, start `watt` with:
`npm run build && npm run start > log`

Then, run separately the `npm run test:performance` command, and wait for the results of both the `TCP` and `IPC` routes.

#### TCP

Service communicating through `TCP` => `npm run test:performance:tcp`

```json
{
  "url": "http://localhost:3043/tsfastify/tcp",
  "connections": 100,
  "sampleInt": 1000,
  "pipelining": 10,
  "workers": 0,
  "duration": 10.02,
  "samples": 10,
  "start": "2025-05-01T10:49:15.523Z",
  "finish": "2025-05-01T10:49:25.544Z",
  "errors": 13,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 2333,
  "resets": 0,
  "1xx": 0,
  "2xx": 7775,
  "3xx": 0,
  "4xx": 0,
  "5xx": 2333,
  "statusCodeStats": {
    "200": {
      "count": 7775
    },
    "500": {
      "count": 2333
    }
  },
  "latency": {
    "average": 818.2,
    "mean": 818.2,
    "stddev": 1839.54,
    "min": 11,
    "max": 9521,
    "p0_001": 11,
    "p0_01": 11,
    "p0_1": 13,
    "p1": 19,
    "p2_5": 29,
    "p10": 45,
    "p25": 66,
    "p50": 132,
    "p75": 360,
    "p90": 2173,
    "p97_5": 7875,
    "p99": 7969,
    "p99_9": 8383,
    "p99_99": 8653,
    "p99_999": 9521,
    "totalCount": 10108
  },
  "requests": {
    "average": 1010.8,
    "mean": 1010.8,
    "stddev": 221.01,
    "min": 591,
    "max": 1281,
    "total": 10108,
    "p0_001": 591,
    "p0_01": 591,
    "p0_1": 591,
    "p1": 591,
    "p2_5": 591,
    "p10": 591,
    "p25": 960,
    "p50": 1047,
    "p75": 1202,
    "p90": 1233,
    "p97_5": 1281,
    "p99": 1281,
    "p99_9": 1281,
    "p99_99": 1281,
    "p99_999": 1281,
    "sent": 11238
  },
  "throughput": {
    "average": 191692.8,
    "mean": 191692.8,
    "stddev": 63243.66,
    "min": 98793,
    "max": 334795,
    "total": 1917095,
    "p0_001": 98815,
    "p0_01": 98815,
    "p0_1": 98815,
    "p1": 98815,
    "p2_5": 98815,
    "p10": 98815,
    "p25": 165887,
    "p50": 180479,
    "p75": 219135,
    "p90": 232447,
    "p97_5": 334847,
    "p99": 334847,
    "p99_9": 334847,
    "p99_99": 334847,
    "p99_999": 334847
  }
}
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
  "duration": 10.1,
  "samples": 10,
  "start": "2025-05-01T10:49:26.009Z",
  "finish": "2025-05-01T10:49:36.112Z",
  "errors": 0,
  "timeouts": 0,
  "mismatches": 0,
  "non2xx": 0,
  "resets": 0,
  "1xx": 0,
  "2xx": 41237,
  "3xx": 0,
  "4xx": 0,
  "5xx": 0,
  "statusCodeStats": {
    "200": {
      "count": 41237
    }
  },
  "latency": {
    "average": 240.05,
    "mean": 240.05,
    "stddev": 73.85,
    "min": 8,
    "max": 570,
    "p0_001": 8,
    "p0_01": 20,
    "p0_1": 57,
    "p1": 93,
    "p2_5": 104,
    "p10": 154,
    "p25": 201,
    "p50": 232,
    "p75": 273,
    "p90": 312,
    "p97_5": 385,
    "p99": 552,
    "p99_9": 559,
    "p99_99": 570,
    "p99_999": 570,
    "totalCount": 41237
  },
  "requests": {
    "average": 4124.2,
    "mean": 4124.2,
    "stddev": 606.7,
    "min": 3101,
    "max": 5079,
    "total": 41237,
    "p0_001": 3101,
    "p0_01": 3101,
    "p0_1": 3101,
    "p1": 3101,
    "p2_5": 3101,
    "p10": 3101,
    "p25": 3803,
    "p50": 4311,
    "p75": 4483,
    "p90": 4707,
    "p97_5": 5079,
    "p99": 5079,
    "p99_9": 5079,
    "p99_99": 5079,
    "p99_999": 5079,
    "sent": 42237
  },
  "throughput": {
    "average": 672102.4,
    "mean": 672102.4,
    "stddev": 98901.49,
    "min": 505463,
    "max": 827877,
    "total": 6721631,
    "p0_001": 505599,
    "p0_01": 505599,
    "p0_1": 505599,
    "p1": 505599,
    "p2_5": 505599,
    "p10": 505599,
    "p25": 620031,
    "p50": 702463,
    "p75": 730623,
    "p90": 767487,
    "p97_5": 827903,
    "p99": 827903,
    "p99_9": 827903,
    "p99_99": 827903,
    "p99_999": 827903
  }
}
```
