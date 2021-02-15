import React from 'react';
import styles from '../../index.css';
const ClapCount = React.memo(({ count, setRefs }) => {
  console.log('render ClapCount');
  return (
    <span
      id='clapCount'
      ref={setRefs}
      data-refkey='clapCountRef'
      className={styles.count}
    >
      +{count}
    </span>
  );
});

export default ClapCount;
