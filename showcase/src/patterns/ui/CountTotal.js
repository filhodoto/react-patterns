import React from 'react';
import styles from '../index.css';

export default React.memo(function CountTotal({ countTotal }) {
  console.log('render CountTotal');
  return (
    <span id='clapCountTotal' className={styles.total}>
      {countTotal}
    </span>
  );
});
