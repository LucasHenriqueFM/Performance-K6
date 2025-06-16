import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  vus: 30,
  duration: '30s',
};

export default function () {
  group('pesquisa de produto', function () {
    let res = http.get('https://dummyjson.com/products/search?q=laptop');

  check(res, {
    'status é 200': (r) => r.status === 200,
    'resultado contém produtos': (r) => r.body.includes('products'),
  });

  sleep(1);
  })
}

export function handleSummary(data) {
  return {
    'relatorio.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}