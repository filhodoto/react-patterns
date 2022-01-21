import { useEffect, useRef } from 'react';

/** ====================================
    *        🔰USAGE
    * 
    * useEffectAfterMount(() => {
    *  everything inside here will be ran with callback()
    * 
    * }, dependencies); // This will be de dependencies array
==================================== **/

const useEffectAfterMount = (callback, dependencies) => {
  // Using useRef to maintain a state between renders an prevent
  // below useEffect to render on mount (without us clicking on clap)
  const componentJustMounted = useRef(true);

  // Listen for count change
  useEffect(() => {
    // If this is not the first render, we ran the callbakc functions
    if (!componentJustMounted.current) {
      // This will be all the actions that will be put inside the hook
      console.log('useEffect invoked');
      return callback();
    }
    // tell hook component was already mounted once
    componentJustMounted.current = false;
  }, dependencies);
};

export default useEffectAfterMount;
