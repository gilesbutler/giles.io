/** Deterministic fictional data, with no requests, SDK, account or persistence. */
const days = [420, 460, 400, 520, 480, 560, 580, 620, 580, 640, 600, 720, 680, 760, 800, 740, 820, 900, 920, 960, 1000, 980, 1100, 1260, 1420, 1600, 1540, 1460];
const sum = values => values.reduce((total, value) => total + value, 0);
export const periods = {
  // The preceding week is the same week visible in the 28-day table.
  7: { rows: days.slice(-7), previousPlays: sum(days.slice(-14, -7)), listeners: 2640, previousListeners: 2200 },
  28: { rows: days, previousPlays: 20500, listeners: 7100, previousListeners: 6800 },
};
export function summarise(period, metric) {
  const data = periods[period];
  if (!data || !['plays', 'listeners'].includes(metric)) throw new RangeError('Unknown period or metric');
  const total = metric === 'plays' ? sum(data.rows) : data.listeners;
  const previous = metric === 'plays' ? data.previousPlays : data.previousListeners;
  return { total, previous, change: previous ? (total - previous) / previous * 100 : null };
}
export function initialiseInsights(scope = document) {
  scope.querySelectorAll('[data-creator-insights]').forEach(root => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    let period = 7, metric = 'plays', view = 'overview';
    const $ = selector => root.querySelector(selector);
    const fmt = value => new Intl.NumberFormat('en-GB').format(value);
    const write = (selector, text) => { $(selector).textContent = text; };
    function svg(tag, attributes, text = '') {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
      node.textContent = text;
      return node;
    }
    function render(announce = true) {
      const result = summarise(period, metric), rows = periods[period].rows;
      const label = metric === 'plays' ? 'Plays' : 'Unique listeners';
      const change = result.change === null ? 'No previous period available.' : `${Math.abs(result.change).toFixed(0)}% ${result.change >= 0 ? 'more' : 'fewer'} than the previous ${period} days.`;
      write('[data-total]', fmt(result.total));
      write('[data-comparison]', change);
      write('[data-metric-label]', label);
      write('[data-definition]', metric === 'plays' ? 'Plays include repeats. They are not unique people.' : 'Chart: daily unique listeners. Total: deduplicated over the whole period.');
      write('#ci-chart-title', `${metric === 'plays' ? 'Daily plays' : 'Daily unique listeners'}, last ${period} days`);
      write('#ci-chart-desc', `Fictional ${metric === 'plays' ? 'plays' : 'daily unique listeners'} on a zero-based axis. Read all values under Underlying data.`);
      write('[data-table-caption]', `Daily values, last ${period} days. Period ends 28 Sep 2026.`);
      root.querySelectorAll('[data-metric]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.metric === metric)));
      root.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
      $('[data-overview]').hidden = view !== 'overview';
      $('[data-data]').hidden = view !== 'data';
      const values = rows.map(value => metric === 'plays' ? value : Math.round(value * .57));
      const max = Math.ceil(Math.max(...values) / 400) * 400;
      const chart = $('.ci-chart svg');
      const width = Math.max(260, Math.round(chart.getBoundingClientRect().width || 720));
      const left = 46, right = width - 12;
      chart.setAttribute('viewBox', `0 0 ${width} 250`);
      const points = values.map((value, index) => [left + index * (right - left) / (values.length - 1), 206 - value / max * 180]);
      const path = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
      $('[data-line]').setAttribute('d', path);
      $('[data-area]').setAttribute('d', `${path} L${right} 206 L${left} 206 Z`);
      const grid = $('[data-grid]');
      grid.replaceChildren();
      for (let index = 0; index <= 4; index++) {
        const y = 206 - index * 45;
        grid.append(svg('line', { x1: left, x2: right, y1: y, y2: y, stroke: '#343633' }));
        grid.append(svg('text', { x: left - 9, y: y + 4, 'text-anchor': 'end', fill: '#b5b9af', 'font-size': 11 }, fmt(max * index / 4)));
      }
      const labels = $('[data-labels]');
      labels.replaceChildren();
      labels.append(svg('text', { x: left, y: 236, fill: '#b5b9af', 'font-size': 12 }, `${29 - period} Sep`), svg('text', { x: right, y: 236, 'text-anchor': 'end', fill: '#b5b9af', 'font-size': 12 }, '28 Sep'));
      const tbody = $('[data-rows]');
      tbody.replaceChildren();
      rows.forEach((value, index) => {
        const row = document.createElement('tr');
        [`${29 - period + index} Sep 2026`, fmt(value), fmt(Math.round(value * .57))].forEach((text, column) => {
          const cell = document.createElement(column ? 'td' : 'th');
          if (!column) cell.scope = 'row';
          cell.textContent = text;
          row.append(cell);
        });
        tbody.append(row);
      });
      const plays = summarise(period, 'plays'), listeners = summarise(period, 'listeners');
      write('[data-insight-title]', metric === 'plays' ? 'Plays grew faster than audience reach.' : 'More people listened. The cause is still a question.');
      write('[data-insight]', `In this example, plays rose ${plays.change.toFixed(0)}% while unique listeners rose ${listeners.change.toFixed(0)}%. These describe different behaviours. Neither figure tells us whether a release, promotion or recommendation caused the change.`);
      write('[data-question]', metric === 'plays' ? 'Where did the new plays come from, and did those listeners return?' : 'Which sources brought new listeners, and how did their listening compare?');
      if (announce) write('[data-announcement]', `${label}: ${fmt(result.total)}. ${change} ${view === 'data' ? 'Underlying data shown.' : 'Overview shown.'}`);
    }
    $('[data-period]').addEventListener('change', event => { period = Number(event.target.value); render(); });
    root.querySelectorAll('[data-metric]').forEach(button => button.addEventListener('click', () => { metric = button.dataset.metric; render(); }));
    root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.view; render(); }));
    $('[data-open-data]').addEventListener('click', () => { view = 'data'; render(); $('[data-view="data"]').focus(); });
    $('[data-reset]').addEventListener('click', () => { period = 7; metric = 'plays'; view = 'overview'; $('[data-period]').value = '7'; render(); });
    render(false);
    if (typeof ResizeObserver !== 'undefined') {
      let previousWidth = 0;
      const observer = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (width && width !== previousWidth) { previousWidth = width; render(false); }
      });
      observer.observe(root);
    }
  });
}
