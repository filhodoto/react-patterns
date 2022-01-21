import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { generateRandomNumber } from "../../utils/generateRandomNumber";
import styles from "../index.css";

/** ====================================
 *          Custom Hook
==================================== **/
import useClapAnimation from "../hooks/useClapAnimation";

/** ====================================
 *      🔰SubComponents
Smaller Component used by <MediumClap />
==================================== **/
import ClapIcon from "./ui/ClapIcon";
import ClapCount from "./ui/ClapCount";
import CountTotal from "./ui/CountTotal";

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
      console.log("useEffect invoked");
      updateUsageCount && updateUsageCount(clapState.count);
    }
  }, [clapState.count]);

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
