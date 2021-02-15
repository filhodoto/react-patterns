import React, { useCallback, useState } from 'react';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import styles from '../index.css';

/** ====================================
 *          Custom Hook
==================================== **/
import useClapAnimation from '../hooks/useClapAnimation';

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

/** ====================================
 *      Create Context
 * this is the context we are gonna pass to MediumClapContext children
==================================== **/
export const MediumClapContext = React.createContext();

const MediumClap = ({ children }) => {
  const [clapState, setClapState] = useState(initialState);
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
        clapState.count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
      isClicked: true,
    }));
  };

  return (
    <MediumClapContext.Provider value={{ ...clapState, setRefs }}>
      <button
        ref={setRefs}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </MediumClapContext.Provider>
  );
};

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/

const Usage = () => {
  return (
    <div>
      <MediumClap>
        <ClapIcon />
        <ClapCount />
        <CountTotal />
      </MediumClap>
      <span>compound-component</span>
    </div>
  );
};

export default Usage;
