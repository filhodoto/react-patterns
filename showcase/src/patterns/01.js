import React, { useState } from 'react';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import styles from './index.css';

/** ====================================
 *          🔰HOC
Higher Order Component for Animation
==================================== **/
import withClapAnimation from './hoc/withClapAnimation';

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

const MediumClap = ({ animationTimeline }) => {
  const MAXIMUM_USER_CLAP = 5;
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal, isClicked } = clapState;

  const handleClapClick = () => {
    // 👉 prop from HOC
    animationTimeline.replay();

    setClapState((prevState) => ({
      count: Math.min(prevState.count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
      isClicked: true,
    }));
  };

  return (
    <button id='clap' className={styles.clap} onClick={handleClapClick}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} />
      <CountTotal countTotal={countTotal} />
    </button>
  );
};

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/

const Usage = () => {
  const AnimatedMediumClap = withClapAnimation(MediumClap);
  return <AnimatedMediumClap />;
};

export default Usage;
