import React from 'react';

function MealClip({ strVideo }) {
  return (

    <iframe
      data-testid="video"
      title={ 'teste'}
      width="853"
      height="480"
      src={ strVideo }
    >
      Video
    </iframe>

  );
}

export default MealClip;
