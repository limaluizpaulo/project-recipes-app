import React from 'react';
// import panGif from '../images/pan.gif';
import tableGif from '../images/table.gif';
import '../styles/loading.css';

function Loading() {
  return (
    <div className="loader">
      <img src={ tableGif } alt="Loader" />
    </div>
  );
}

export default Loading;
