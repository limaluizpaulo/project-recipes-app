import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

import { mealInfo, drinkInfo } from '../../functions';

export default function FavoriteRecipeCard({ recipe, index,
  handleLikeClick }) { // descontrução de props
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  console.log(handleLikeClick);
  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="card"
          width="150px"
        />
      </Link>
      { type === 'comida'
        ? mealInfo(index, area, category)
        : drinkInfo(index, alcoholicOrNot) }
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <ShareButton id={ id } type={ type } index={ index } path />
      <LikeButton
        recipe
        captureFavorited={ () => console.log('nothing') }
        clickFavBtn={ handleLikeClick }
        id={ id }
        favPage
        index={ index }
      />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
  // setFavorited: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
};
