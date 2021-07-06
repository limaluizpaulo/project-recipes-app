import React from 'react';
import PropTypes from 'prop-types';

function DetailsImage(props) {
  const { value: { recipe, url } } = props;
  const food = /comida/gi;
  if (url.match(food)) {
    return (
      <img
        className="details-image"
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt="prato pronto"
      />
    );
  }
  return (
    <img
      className="details-image"
      data-testid="recipe-photo"
      src={ recipe.strDrinkThumb }
      alt="prato pronto"
    />
  );
}

DetailsImage.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
  url: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsImage;
