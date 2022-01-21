import React, { useContext } from 'react';
import { MediumClapContext } from '..';
import styles from '../../index.css';

const ClapCount = React.memo(() => {
  const { count, setRefs } = useContext(MediumClapContext);

  console.log('render ClapCount');
  return (
    <span ref={setRefs} data-refkey='clapCountRef' className={styles.count}>
      +{count}
    </span>
  );
});

export default ClapCount;
