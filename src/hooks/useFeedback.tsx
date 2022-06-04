import React, { useState } from 'react';

type IFeedback = IGuessFeedback[];

interface IGuessFeedback {
    guess: string;
    tileFeedback: ITileFeedback[];
}

interface ITileFeedback {
    letter: string;
    feedback: 'hit' | 'close' | 'miss';
}

function useFeedback(): [(guess: string) => boolean, (feedback: IFeedback) => void] {
    const [known, setKnown] = useState<string[]>([]);
    const [includes, setIncludes] = useState<string[]>([]);
    const [excludes, setExcludes] = useState<string[]>([]);

    const update = (feedback: IFeedback) => {

    };

    const validFilter = (guess: string) => {
        var acc = true;
        known.forEach((k, i) => {
            if (k && guess[i] != k) {
                acc = false;
            }
        });
        return acc;
    };

    return [ validFilter, update ];
}

export default useFeedback;