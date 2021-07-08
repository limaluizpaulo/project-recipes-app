import React from 'react';
import PropTypes from 'prop-types';

const HeaderRecipes = ({ newObj }) => {
  const { imageHeader, title, category, alcoholic } = newObj;
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ imageHeader }
        alt=""
      />
      <title data-testid="recipe-title">
        {title}
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
