import autocannon from "autocannon";
import fs from "node:fs";

const getMbFromBytes = (data: number): number =>
  Math.round(data / (1024 * 1024));

const getMetricValue = (data: string, key: string): number => {
  const match = data.match(
    new RegExp(`^${key}\\s+([0-9]+(?:\\.[0-9]+)?)`, "m")
  );
  return match && match[1] ? Math.round(Number.parseFloat(match[1])) : -1;
};

const performance = async () => {
  const type = process.env.TYPE || "ipc";
  console.info(`\nRunning benchmarks for ${type.toUpperCase()} connection\n`);

  const result = await autocannon({
    connections: 100,
    duration: 10,
    pipelining: 10,
    url: `http://127.0.0.1:3043/${type}`,
  });

  const metrics = await fetch("http://127.0.0.1:8008/metrics");
  const metricsData = await metrics.text();

  fs.writeFileSync(
    `logs/${type}.log`,
    `2xx => ${result["2xx"]}#
latency.avg => ${Math.round(result.latency.average)}ms
latency.p50 => ${result.latency.p50}ms
latency.p90 => ${result.latency.p90}ms
latency.p99 => ${result.latency.p99}ms
requests.avg => ${Math.round(result.requests.average)}/s
throughput.avg => ${Math.round(result.throughput.average / 1024)}KB
heap.size.total => ${getMbFromBytes(
      getMetricValue(
        metricsData,
        'nodejs_heap_size_total_bytes{serviceId="tsfastify"}'
      )
    )}MB
heap.size.used => ${getMbFromBytes(
      getMetricValue(
        metricsData,
        'nodejs_heap_size_used_bytes{serviceId="tsfastify"}'
      )
    )}MB
heap.size.new => ${getMbFromBytes(
      getMetricValue(
        metricsData,
        'nodejs_heap_space_size_used_bytes{space="new",serviceId="tsfastify"}'
      )
    )}MB
heap.size.old => ${getMbFromBytes(
      getMetricValue(
        metricsData,
        'nodejs_heap_space_size_used_bytes{space="old",serviceId="tsfastify"}'
      )
    )}MB
elu => ${getMetricValue(
      metricsData,
      'nodejs_eventloop_utilization{serviceId="tsfastify"}'
    )}
cpu => ${getMetricValue(
      metricsData,
      'thread_cpu_percent_usage{serviceId="tsfastify"}'
    )}%`
  );
};

performance();
