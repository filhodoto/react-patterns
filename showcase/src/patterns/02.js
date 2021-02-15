import React, { useCallback, useState, useRef } from 'react';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import styles from './index.css';

/** ====================================
 *          Custom Hook
==================================== **/
import useClapAnimation from './hooks/useClapAnimation';

/** ====================================
 *      🔰SubComponents
Smaller Component used by <MediumClap />
==================================== **/
import ClapIcon from './ui/ClapIcon';
import ClapCount from './ui/ClapCount';
import CountTotal from './ui/CountTotal';

/** ====================================
 *      🔰 MediumClap
==================================== **/
const initialState = {
  count: 0,
  countTotal: generateRandomNumber(500, 10000),
  isClicked: false,
};

const MediumClap = () => {
  const [{ count, countTotal, isClicked }, setClapState] = useState(
    initialState
  );
  const [elRefs, setElRefs] = useState({}); // Object with ref for each node element

  const MAXIMUM_USER_CLAP = 5;

  // Set refs for each element we use on this
  // For each node we set the refs object list of objects with {[key of el]: the node element},
  // we get the key from a dataset element we created, data-refkey.
  // We use useCallback so we don't have to create a new instance of this function everytime the
  // components that will take this as prop will re-render
  const setRefs = useCallback((node) => {
    setElRefs((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  // Pass node refs to our custom hooks
  const animationTimeline = useClapAnimation({
    clapEl: elRefs.clapRef,
    countEl: elRefs.clapCountRef,
    clapTotalEl: elRefs.countTotalRef,
  });

  const handleClapClick = () => {
    // 👉 prop from custom hook
    animationTimeline.replay();

    setClapState((prevState) => ({
      count: Math.min(prevState.count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
      isClicked: true,
    }));
  };

  return (
    <button
      ref={setRefs}
      data-refkey='clapRef'
      className={styles.clap}
      onClick={handleClapClick}
    >
      <ClapIcon isClicked={isClicked} setRefs={setRefs} />
      <ClapCount count={count} setRefs={setRefs} />
      <CountTotal countTotal={countTotal} setRefs={setRefs} />
    </button>
  );
};

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/

const Usage = () => {
  return <MediumClap />;
};

export default Usage;
