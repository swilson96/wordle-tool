import { FrequencyMap, WordleData } from "../model/types";
import { alphabet } from '../model/constants';

const filter = (words: string[], wordleData: WordleData) => {
    const knowns = wordleData.guessData.reduce((acc, g) => g.tilesData.map((t, i) => {
        if (t.marking === 'hit') {
          return t.letter;
        }
        return acc[i];
      }), ['','','','','']);

      const minFrequencies: FrequencyMap = {};
      const maxFrequencies: FrequencyMap = {};
      alphabet.split('').forEach(l => { 
        minFrequencies[l] = 0;
        maxFrequencies[l] = 5;
      });

      wordleData.guessData.forEach(g => {
        g.guess.split('').forEach(l => {
            const freq = g.tilesData.filter(t => t.letter === l && t.marking !== 'miss').length;
            if (minFrequencies[l] < freq) {
              minFrequencies[l] = freq;
            }
            if (g.tilesData.filter(t => t.letter === l && t.marking === 'miss').length) {
              maxFrequencies[l] = freq;
            }
        });
      });

      const excludeByPosition = wordleData.guessData.reduce((acc, g) => g.tilesData.map((t, i) => {
        if (t.marking === 'close') {
          acc[i].push(t.letter);
        }
        return acc[i];
      }), [[],[],[],[],[]] as string[][]);
    
      const filteredWords = words.filter(w => {
        for (var i = 0; i < 5; ++i) {
          const c = w.charAt(i);
          if (knowns[i] && knowns[i] !== c) {
            return false;
          }
          if (excludeByPosition[i].includes(c)) {
            return false;
          }

          const freq = w.split('').filter(d => c === d).length;
          if (freq < minFrequencies[c] || freq > maxFrequencies[c]) {
            return false;
          }
        }

        return Object.keys(minFrequencies)
          .filter(l => minFrequencies[l] > 0)
          // Already checked there are at least as many, so just need to check includes here
          .reduce<boolean>((acc, l) => acc && w.includes(l), true);
      });

      return filteredWords;
};

export default filter;