import assert from 'node:assert/strict';
import test from 'node:test';
import { GLYPHS, chunkColumns, columnsForText, normalizeText } from '../src/font.js';

test('normalizes copy for the original uppercase bitmap font', () => {
  assert.equal(normalizeText('Hello\n  world'), 'HELLO WORLD');
});

test('preserves ampersands as real characters rather than HTML entities', () => {
  assert.ok(GLYPHS['&']);
  assert.equal(GLYPHS['&amp;'], undefined);
  assert.deepEqual(columnsForText('&').slice(0, GLYPHS['&'].length), GLYPHS['&']);
});

test('falls back to a question mark for unsupported glyphs', () => {
  assert.deepEqual(columnsForText('🙂').slice(0, GLYPHS['?'].length), GLYPHS['?']);
});

test('adds configurable spacing between characters', () => {
  const withGap = columnsForText('AB');
  const withoutGap = columnsForText('AB', { gap: 0 });
  assert.equal(withGap.length, withoutGap.length + 2);
});

test('chunks long messages without losing columns', () => {
  const columns = columnsForText('A'.repeat(2000));
  const chunks = chunkColumns(columns, 128);
  assert.ok(chunks.length > 1);
  assert.deepEqual(chunks.flat(), columns);
  assert.ok(chunks.every((chunk) => chunk.length <= 128));
});

test('rejects invalid chunk sizes', () => {
  assert.throws(() => chunkColumns([[]], 0), RangeError);
});
