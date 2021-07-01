import React from 'react';

function MealClip({ strVideo, strMeal }) {
  return (

    <iframe
      data-testid="video"
      title={ strMeal }
      width="853"
      height="480"
      src={ strVideo }
    >
      Video
    </iframe>

  );
}

export default MealClip;
