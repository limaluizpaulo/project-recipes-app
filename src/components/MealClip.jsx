import React from 'react';

function MealClip({ strYoutube, strMeal }) {
  console.log(strYoutube);
  return (
    <iframe
      data-testid="video"
      title={ strMeal }
      src={ strYoutube }
    />
  );
}

export default MealClip;
