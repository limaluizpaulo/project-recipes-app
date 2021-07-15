import React, { useContext } from 'react';
import RecipeContext from '../../context/Context';
import AlternativesCaroussel from './AlternativesCaroussel';

const FoodVideoAndRecomendation = () => {
  const { selectedFood } = useContext(RecipeContext);
  const renderYoutubeVideo = () => {
    const { strYoutube } = selectedFood;
    if (!strYoutube) return;
    const URL = strYoutube.replace('watch?v=', 'embed/');
    return (
      <>
        <h3 className="details__video__title">Video</h3>
        <iframe
          data-testid="video"
          className="details__video"
          src={ URL }
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </>

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
