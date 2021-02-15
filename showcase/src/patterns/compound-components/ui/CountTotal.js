import React, { useContext } from 'react';
import { MediumClapContext } from '..';
import styles from '../../index.css';

export default React.memo(function CountTotal() {
  const { countTotal, setRefs } = useContext(MediumClapContext);
  console.log('render CountTotal');
  return (
    <span
      id='clapCountTotal'
      ref={setRefs}
      data-refkey='countTotalRef'
      className={styles.total}
    >
      {countTotal}
    </span>
  );
});
