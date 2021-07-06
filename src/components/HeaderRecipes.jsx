import React from 'react';
import PropTypes from 'prop-types';

const HeaderRecipes = ({ newObj }) => {
  const { imageHeader, title, category } = newObj;
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
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h2
        data-testid="recipe-category"
      >
        {category}
      </h2>
    </div>
  );
};

HeaderRecipes.propTypes = {
  imageHeader: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default HeaderRecipes;
