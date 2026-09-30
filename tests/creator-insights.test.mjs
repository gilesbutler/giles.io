import test from 'node:test';
import assert from 'node:assert/strict';
import { periods, summarise } from '../src/components/applications/creator-insights.js';

test('seven-day plays total the rows shown to the visitor', () => {
  assert.equal(summarise(7, 'plays').total, 9360);
});
test('previous seven days agree with the overlapping 28-day data', () => {
  const precedingWeek = periods[28].rows.slice(-14, -7).reduce((a, b) => a + b, 0);
  assert.equal(summarise(7, 'plays').previous, precedingWeek);
  assert.equal(precedingWeek, 6140);
});
test('percentage changes are calculated, not hard-coded', () => {
  for (const period of [7, 28]) for (const metric of ['plays', 'listeners']) {
    const { total, previous, change } = summarise(period, metric);
    assert.equal(change, (total - previous) / previous * 100);
  }
});
test('unique listeners are distinct from the sum of daily uniques', () => {
  for (const period of [7, 28]) {
    const daily = periods[period].rows.map(value => Math.round(value * .57));
    const unique = summarise(period, 'listeners').total;
    assert.ok(unique >= Math.max(...daily));
    assert.ok(unique < daily.reduce((a, b) => a + b, 0));
    assert.ok(unique <= summarise(period, 'plays').total);
  }
});
test('the narrative about faster play growth holds for both periods', () => {
  for (const period of [7, 28]) assert.ok(summarise(period, 'plays').change > summarise(period, 'listeners').change);
});
test('unknown period and metric are rejected', () => {
  assert.throws(() => summarise(14, 'plays'), RangeError);
  assert.throws(() => summarise(7, 'followers'), RangeError);
});
