import React from 'react';
import LoadingGif from '../images/LoadingGif.gif';
import '../styles/loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={ LoadingGif } alt="" />
    </div>

  );
}
