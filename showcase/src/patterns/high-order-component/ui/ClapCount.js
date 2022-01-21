import React from 'react';
import styles from '../../index.css';
const ClapCount = React.memo(({ count }) => {
  console.log('render ClapCount');
  return (
    <span id='clapCount' className={styles.count}>
      +{count}
    </span>
  );
});

export default ClapCount;
