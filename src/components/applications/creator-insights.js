/** Fictional, deterministic data. No requests, analytics SDK, audio or account. */
const days = [420,460,400,520,480,560,580,620,580,640,600,720,680,760,800,740,820,900,920,960,1000,980,1100,1260,1420,1600,1540,1460];
export const periods = {
  7: { rows: days.slice(-7), previousPlays: 7488, listeners: 2640, previousListeners: 2200 },
  28: { rows: days, previousPlays: 20500, listeners: 7100, previousListeners: 6800 },
};
export function summarise(period, metric) {
  const data = periods[period];
  if (!data || !['plays', 'listeners'].includes(metric)) throw new RangeError('Unknown period or metric');
  const total = metric === 'plays' ? data.rows.reduce((a, b) => a + b, 0) : data.listeners;
  const previous = metric === 'plays' ? data.previousPlays : data.previousListeners;
  return { total, previous, change: previous ? (total - previous) / previous * 100 : null };
}
export function initialiseInsights(scope = document) {
  scope.querySelectorAll('[data-creator-insights]').forEach(root => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    let period = 7, metric = 'plays', view = 'overview';
    const $ = s => root.querySelector(s);
    const fmt = n => new Intl.NumberFormat('en-GB').format(n);
    const write = (s, t) => { $(s).textContent = t; };
    const NS = 'http://www.w3.org/2000/svg';
    function svg(tag, attrs, text = '') { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v)); e.textContent = text; return e; }
    function render(announce = true) {
      const result = summarise(period, metric), rows = periods[period].rows;
      const label = metric === 'plays' ? 'Plays' : 'Unique listeners';
      const change = result.change === null ? 'No previous period available.' : `${Math.abs(result.change).toFixed(0)}% ${result.change >= 0 ? 'more' : 'fewer'} than the previous ${period} days.`;
      write('[data-total]', fmt(result.total)); write('[data-comparison]', change); write('[data-metric-label]', label);
      write('[data-definition]', metric === 'plays' ? 'Plays include repeats. They are not unique people.' : 'Chart: daily unique listeners. Total: deduplicated over the whole period.');
      write('#ci-chart-title', `${metric === 'plays' ? 'Daily plays' : 'Daily unique listeners'}, last ${period} days`);
      write('#ci-chart-desc', `Fictional ${metric === 'plays' ? 'plays' : 'daily unique listeners'} on a zero-based axis. Read all values under Underlying data.`);
      write('[data-table-caption]', `Daily values, last ${period} days. Period ends 28 Sep 2026.`);
      root.querySelectorAll('[data-metric]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.metric === metric)));
      root.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
      $('[data-overview]').hidden = view !== 'overview'; $('[data-data]').hidden = view !== 'data';
      const values = rows.map(n => metric === 'plays' ? n : Math.round(n * .57));
      const max = Math.ceil(Math.max(...values) / 400) * 400;
      const chart = $('.ci-chart svg');
      const width = Math.max(260, Math.round(chart.getBoundingClientRect().width || 720));
      const left = 46, right = width - 12;
      chart.setAttribute('viewBox', `0 0 ${width} 250`);
      const points = values.map((v, i) => [left + i * (right - left) / (values.length - 1), 206 - v / max * 180]);
      const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
      $('[data-line]').setAttribute('d', path); $('[data-area]').setAttribute('d', `${path} L${right} 206 L${left} 206 Z`);
      const grid = $('[data-grid]'); grid.replaceChildren();
      for (let i = 0; i <= 4; i++) { const y = 206 - i * 45; grid.append(svg('line', { x1:left, x2:right, y1:y, y2:y, stroke:'#343633' })); grid.append(svg('text', { x:left-9, y:y+4, 'text-anchor':'end', fill:'#b5b9af', 'font-size':11 }, fmt(max*i/4))); }
      const labels = $('[data-labels]'); labels.replaceChildren();
      labels.append(svg('text', { x:left, y:236, fill:'#b5b9af', 'font-size':12 }, `${29-period} Sep`), svg('text', { x:right, y:236, 'text-anchor':'end', fill:'#b5b9af', 'font-size':12 }, '28 Sep'));
      const tbody = $('[data-rows]'); tbody.replaceChildren();
      rows.forEach((n, i) => { const tr = document.createElement('tr'); [`${29-period+i} Sep 2026`, fmt(n), fmt(Math.round(n*.57))].forEach((text, index) => { const cell = document.createElement(index ? 'td' : 'th'); if (!index) cell.scope = 'row'; cell.textContent = text; tr.append(cell); }); tbody.append(tr); });
      const plays = summarise(period, 'plays'), listeners = summarise(period, 'listeners');
      write('[data-insight-title]', metric === 'plays' ? 'Plays grew faster than audience reach.' : 'More people listened. The cause is still a question.');
      write('[data-insight]', `In this example, plays rose ${plays.change.toFixed(0)}% while unique listeners rose ${listeners.change.toFixed(0)}%. These describe different behaviours. Neither figure tells us whether a release, promotion or recommendation caused the change.`);
      write('[data-question]', metric === 'plays' ? 'Where did the new plays come from, and did those listeners return?' : 'Which sources brought new listeners, and how did their listening compare?');
      if (announce) write('[data-announcement]', `${label}: ${fmt(result.total)}. ${change} ${view === 'data' ? 'Underlying data shown.' : 'Overview shown.'}`);
    }
    $('[data-period]').addEventListener('change', e => { period = Number(e.target.value); render(); });
    root.querySelectorAll('[data-metric]').forEach(b => b.addEventListener('click', () => { metric = b.dataset.metric; render(); }));
    root.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => { view = b.dataset.view; render(); }));
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
