import React, { useContext } from 'react';

import RecipeContext from '../context/Context';
import AlternativesCaroussel from './AlternativesCaroussel';

const FoodVideoAndRecomendation = () => {
  const { selectedFood } = useContext(RecipeContext);
  if (!selectedFood) {
    return (
      <p>loading</p>
    );
  }

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
      <AlternativesCaroussel />
    </>
  );
};

export default FoodVideoAndRecomendation;
