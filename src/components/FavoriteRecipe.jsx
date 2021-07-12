import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import Header from './Header';
// import DoneAndFavorite from './DoneAndFavorite';
// import BtnsFilters from './BtnsFilters';
import ShareBtn from './ShareBtn';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes({ item, index, handleFavorite }) {
  return (
    <section className="card-done-favorite">
      <div className="">
        <Link
          to={ item.type === 'comida'
            ? `/comidas/${item.id}` : `/bebidas/${item.id}` }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="avatar"
            className="recipe-card-img"
          />
        </Link>
      </div>
      <div className="done-right-content-favorite">
        <Link
          to={ item.type === 'comida'
            ? `/comidas/${item.id}` : `/bebidas/${item.id}` }
        >

          <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
        </Link>
        <div className="favorite-category">

          {item.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.area}
              {' '}
              -
              {' '}
              {item.category}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot}
            </p>
          )}
        </div>
        <div className="share-and-like-favorite">
          <ShareBtn recipe={ item } index={ index } doneRecipe />
          <button
            type="button"
            onClick={ () => handleFavorite(item) }
            className="like-button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

FavoriteRecipes.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
