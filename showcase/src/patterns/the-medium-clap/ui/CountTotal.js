import React from 'react';
import styles from '../../index.css';

export default React.memo(function CountTotal({ countTotal, setRefs }) {
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
