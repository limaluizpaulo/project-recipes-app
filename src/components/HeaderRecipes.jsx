import React from 'react';
import PropTypes from 'prop-types';

const HeaderRecipes = ({ newObj }) => {
  const { image, name, category, alcoholic } = newObj;
  return (
    <div>
      <img
        width="200px"
        data-testid="recipe-photo"
        src={ image }
        alt=""
      />
      <title data-testid="recipe-title">
        {name}
      </title>
      <h2
        data-testid="recipe-category"
      >
        {alcoholic || category}
      </h2>
    </div>
  );
};

HeaderRecipes.propTypes = {
  id: PropTypes.string,
  imageHeader: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default HeaderRecipes;
