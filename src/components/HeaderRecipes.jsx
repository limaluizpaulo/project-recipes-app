import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShareButton } from '.';
import { UserContext } from '../context/UserProvider';

const HeaderRecipes = ({ newObj }) => {
  const { copied } = useContext(UserContext);

  const { id, type, imageHeader, title, category, alcoholic } = newObj;
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
      {copied ? 'Link copiado!' : ''}

      <ShareButton
        type={ type === 'meals' ? 'comida' : 'bebida' }
        id={ id }
        index="0"
      />
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
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
