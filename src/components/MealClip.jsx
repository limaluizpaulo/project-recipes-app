import React from 'react';
import PropTypes from 'prop-types';

function MealClip({ strYoutube, strMeal }) {
  if (strYoutube) {
    const treatVideo = strYoutube.replace('watch', 'embed');
    return (
      <iframe
        data-testid="video"
        src={ treatVideo }
        title={ strMeal }
      />
    );
  }

  return <span>Não temos vídeo para essa receita</span>;
}

MealClip.propTypes = {
  strYoutube: PropTypes.string,
  strMeal: PropTypes.string,
};

MealClip.defaultProps = {
  strYoutube: undefined,
  strMeal: undefined,
};

export default MealClip;
