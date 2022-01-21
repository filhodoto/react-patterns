import { useState, useCallback } from 'react';

const useClapState = (initialState) => {
  const MAXIMUM_USER_CLAP = 5;

  const [clapState, setState] = useState(initialState);

  // Function that updates state and we will return
  const setClapState = useCallback(
    () =>
      setState(({ count, countTotal }) => ({
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
        isClicked: true,
      })),
    [clapState]
  );

  // On a useHook we should return the sate and the update state function
  return [clapState, setClapState];
};

export default useClapState;
