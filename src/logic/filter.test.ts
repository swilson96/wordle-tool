import React from 'react';
import filter from './filter';

test('filters by known and included letters', () => {
  const result = filter(['store', 'stair', 'flair'], { guessData: [{ guess: 'stare', tilesData: [
      { letter: 's', marking: 'hit' },
      { letter: 't', marking: 'hit' },
      { letter: 'a', marking: 'hit' },
      { letter: 'r', marking: 'close' },
      { letter: 'e', marking: 'miss' }
    ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('stair');
});

test('filters out excluded letters', () => {
    const result = filter(['water', 'plier', 'owner'], { guessData: [{ guess: 'paper', tilesData: [
        { letter: 'p', marking: 'miss' },
        { letter: 'a', marking: 'miss' },
        { letter: 'p', marking: 'miss' },
        { letter: 'e', marking: 'hit' },
        { letter: 'r', marking: 'hit' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('owner');
});

test('allows duplicates when only one guessed', () => {
    const result = filter(['elite'], { guessData: [{ guess: 'stare', tilesData: [
        { letter: 's', marking: 'miss' },
        { letter: 't', marking: 'close' },
        { letter: 'a', marking: 'miss' },
        { letter: 'r', marking: 'miss' },
        { letter: 'e', marking: 'hit' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('elite');
});

test('allows duplicates when both guessed one right', () => {
    const result = filter(['elite'], { guessData: [{ guess: 'eater', tilesData: [
        { letter: 'e', marking: 'hit' },
        { letter: 'a', marking: 'miss' },
        { letter: 't', marking: 'close' },
        { letter: 'e', marking: 'close' },
        { letter: 'r', marking: 'miss' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('elite');
});

test('allows duplicates when both guessed', () => {
    const result = filter(['elite', 'later'], { guessData: [{ guess: 'skeet', tilesData: [
        { letter: 's', marking: 'miss' },
        { letter: 'k', marking: 'miss' },
        { letter: 'e', marking: 'close' },
        { letter: 'e', marking: 'close' },
        { letter: 't', marking: 'close' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('elite');
});

test('filters out duplicates', () => {
    // TODO: check how wordle actually scores this case
  const result = filter(['elite', 'entry'], { guessData: [{ guess: 'skeet', tilesData: [
        { letter: 's', marking: 'miss' },
        { letter: 'k', marking: 'miss' },
        { letter: 'e', marking: 'miss' },
        { letter: 'e', marking: 'close' },
        { letter: 't', marking: 'close' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('entry');
});

test('filters out singles when duplicate is known', () => {
  const result = filter(['glass', 'class', 'flask', 'slash'], { guessData: [{ guess: 'slash', tilesData: [
        { letter: 's', marking: 'close' },
        { letter: 'l', marking: 'hit' },
        { letter: 'a', marking: 'hit' },
        { letter: 's', marking: 'hit' },
        { letter: 'h', marking: 'miss' }
      ] }]});
  expect(result).toHaveLength(2);
  expect(result).toContain('glass');
  expect(result).toContain('class');
});

test('filters out when letters missing', () => {
  const result = filter(['stair', 'staff'], { guessData: [{ guess: 'start', tilesData: [
        { letter: 's', marking: 'hit' },
        { letter: 't', marking: 'hit' },
        { letter: 'a', marking: 'hit' },
        { letter: 'r', marking: 'close' },
        { letter: 't', marking: 'miss' }
      ] }]});
  expect(result).toHaveLength(1);
  expect(result).toContain('stair');
});
