import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

import * as loadingLottie from '../../loading.json';
import * as doneLottie from '../../done.json';

const loadingAnimation = {
  loop: true,
  autoplay: true,
  animationData: loadingLottie.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const doneAnimation = {
  loop: false,
  autoplay: true,
  animationData: doneLottie.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Loading({ loading }) {
  return (
    <div style={ { marginTop: '10rem' } }>
      {!loading ? (
        <Lottie options={ loadingAnimation } height={ 120 } width={ 120 } />
      ) : (
        <Lottie options={ doneAnimation } height={ 120 } width={ 120 } />
      )}
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: undefined,
};
