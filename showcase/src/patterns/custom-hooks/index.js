import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import styles from '../index.css';

/** ====================================
 *          Custom Hook
==================================== **/
import useClapAnimation from '../hooks/useClapAnimation';
import useDOMRef from '../hooks/useDOMRef';
import useClapState from '../hooks/useClapState';

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

const MediumClap = ({ children, updateUsageCount }) => {
  const [clapState, setClapState] = useClapState(initialState);
  const [{ clapRef, clapCountRef, countTotalRef }, setRefs] = useDOMRef();

  // Using useRef to maintain a state between renders an prevent
  // below useEffect to render on mount (without us clicking on clap)
  const componentJustMounted = useRef(true);

  // Listen for count change
  useEffect(() => {
    // If component just mounted, we change the ref and do nothing else
    if (componentJustMounted.current) {
      componentJustMounted.current = false;
    } else {
      // If useEffect ran but component as already mounted that means it is running
      // because clapState.count changed. So we ran our callback function to update count in <Usage>
      console.log('useEffect invoked');
      updateUsageCount && updateUsageCount(clapState.count);
    }
  }, [clapState.count]);

  // Pass node refs to our custom hooks
  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: countTotalRef,
  });

  const handleClapClick = () => {
    // 👉 prop from custom hook
    animationTimeline.replay();

    // Update state using hook function
    setClapState();
  };

  // Memoize the values we hare passing to the Context Provider
  const memoizedValues = useMemo(() => {
    return {
      ...clapState,
      setRefs,
    };
  }, [clapState, setRefs]);

  return (
    <MediumClapContext.Provider value={memoizedValues}>
      <button
        ref={setRefs}
        data-refkey="clapRef"
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </MediumClapContext.Provider>
  );
};

/** ====================================
    * Example of how we could construct the 
    * components to have a relationship between them when we called
    * them as if MediumClap is the main component
==================================== **/

// A Component is in fact an object so we can add another
// key to it that returns the component ClapIcon
MediumClap.Icon = ClapIcon;

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/

const Usage = () => {
  const [usageCount, setUsageCount] = useState(0);

  // Callback function will pass as prop to Medium so we can get
  // the original "count" value outside of MediumClap and update this state with it
  const updateUsageCount = (count) => setUsageCount(count);

  return (
    <div>
      <MediumClap updateUsageCount={updateUsageCount}>
        {/* Call ClapIcon via Medium user as we defined it in line 94 */}
        <MediumClap.Icon />
        <ClapCount />
        <CountTotal />
      </MediumClap>
      <div
        className={styles.info}
      >{`compound-component clicked ${usageCount}`}</div>
    </div>
  );
};

export default Usage;
