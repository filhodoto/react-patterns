import { useState, useCallback } from 'react';

const useDOMRef = () => {
  const [DOMRef, setRefState] = useState({}); // Object with ref for each node element

  // Set refs for each element we use on this
  // For each node we set the refs object list of objects with {[key of el]: the node element},
  // we get the key from a dataset element we created, data-refkey.
  // We use useCallback so we don't have to create a new instance of this function everytime the
  // components that will take this as prop will re-render
  const setRefs = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  // On a useHook we should return the sate and the update state function
  return [DOMRef, setRefs];
};

export default useDOMRef;
