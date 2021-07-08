import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

import * as loadingLottie from '../../loading.json';
import * as doneLottie from '../../done.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingLottie.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const defaultOptions2 = {
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
        <Lottie options={ defaultOptions } height={ 120 } width={ 120 } />
      ) : (
        <Lottie options={ defaultOptions2 } height={ 120 } width={ 120 } />
      )}
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
