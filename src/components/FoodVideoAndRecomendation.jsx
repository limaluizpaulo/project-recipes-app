import React, { useContext } from 'react';

import RecipeContext from '../context/Context';

const FoodVideoAndRecomendation = () => {
  const { selectedFood } = useContext(RecipeContext);
  const { strYoutube, strDrinkAlternate } = selectedFood;
  const URL = strYoutube.replace('watch?v=', 'embed/');
  const renderCaroussel = () => {
    strDrinkAlternate.map((beb, index) => (
      <span key={ index } data-testid={ `${index}-recomendation-card` }>
        {beb}
      </span>
    ));
  };
  return (
    <>
      <iframe
        data-testid="video"
        width="360"
        height="180"
        src={ URL }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
      <p data>{renderCaroussel}</p>
    </>
  );
};

export default FoodVideoAndRecomendation;
// https://www.youtube.com/embed/VVnZd8A84z4"
