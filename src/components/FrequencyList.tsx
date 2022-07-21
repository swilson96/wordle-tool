import React from 'react';
import { FrequencyMap } from '../model/types';
import './Frequency.css';

interface IFrequencyProps {
  frequencies: FrequencyMap;
}

function FrequencyList({ frequencies} : IFrequencyProps) {
  const sorted = Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a]);

  return (
    <div className="Frequency">
      {sorted.map(l => <div key={l}>{l}: {frequencies[l]}</div>)}
    </div>
  );
}

export default FrequencyList;