import React from 'react';
import panGif from '../images/pan.gif';
import '../styles/loading.css';

function OtherLoader() {
  return (
    <div className="loader">
      <img src={ panGif } alt="Loader" />
    </div>
  );
}

export default OtherLoader;
