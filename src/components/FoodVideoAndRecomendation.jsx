import React, { useContext } from 'react';

import RecipeContext from '../context/Context';

const FoodVideoAndRecomendation = () => {
  const { selectedFood } = useContext(RecipeContext);
  if (!selectedFood) {
    return (
      <p>loading</p>
    );
  }

  const renderCaroussel = () => {
    const alternatives = ['beb', 'beb1'];
    return alternatives.map((beb, index) => (
      <span key={ index } data-testid={ `${index}-recomendation-card` }>
        {beb}
      </span>
    ));
  };
  const renderYoutubeVideo = () => {
    const { strYoutube } = selectedFood;
    if (!strYoutube) return;
    const URL = strYoutube.replace('watch?v=', 'embed/');
    return (
      <iframe
        data-testid="video"
        width="360"
        height="180"
        src={ URL }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
    );
  };
  return (
    <>
      {renderYoutubeVideo()}
      {renderCaroussel()}
    </>
  );
};

export default FoodVideoAndRecomendation;
// https://www.youtube.com/embed/VVnZd8A84z4"
