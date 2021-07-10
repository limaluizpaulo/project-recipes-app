import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import unfavIcon from '../images/blackHeartIcon.svg';

import '../styles/FavRecipes.css';
import '../styles/DoneRecipes.css';

function Favorited(props) {
  const { favoriteList, copied, category,
    indexNumber, setCopied, shareRecipe,
    unfavoriteRecipe, unfavoriteFilteredRecipe } = props;
  const renderAllRecipes = () => (
    <main className="maincards top-main">
      {favoriteList.map((favoriteRecipe, index) => (
        <div key={ index } className="generic-card">
          <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
            <img
              src={ favoriteRecipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              width="150px"
            />
            <h4
              className="card-name"
              data-testid={ `${index}-horizontal-name` }
            >
              {favoriteRecipe.name}
            </h4>
          </Link>
          <h6 data-testid={ `${index}-horizontal-top-text` }>
            {favoriteRecipe.area}
            {favoriteRecipe.alcoholicOrNot}
            {' - '}
            {favoriteRecipe.category}
          </h6>
          <button type="button" onClick={ () => unfavoriteRecipe(index) }>
            <img
              src={ unfavIcon }
              alt="unfav"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button
            type="button"
            onClick={ () => shareRecipe(favoriteRecipe, index) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <span
            id={ index }
            className={ `${copied && indexNumber === index
              ? 'alert-show' : 'alert-hidden'}` }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </span>
        </div>
      ))}
    </main>);

  const renderByCategory = () => (
    <main className="maincards top-main">
      {favoriteList.filter((recipe) => recipe.type === category)
        .map((favoriteRecipe, index) => (
          <div key={ index } className="generic-card">
            <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
              <img
                src={ favoriteRecipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
              <h4
                className="card-name"
                data-testid={ `${index}-horizontal-name` }
              >
                {favoriteRecipe.name}
              </h4>
            </Link>
            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {favoriteRecipe.area}
              {favoriteRecipe.alcoholicOrNot}
              {' - '}
              {favoriteRecipe.category}
            </h6>
            <br />
            <button
              type="button"
              onClick={ () => unfavoriteFilteredRecipe(favoriteRecipe.id) }
            >
              <img
                src={ unfavIcon }
                alt="unfav"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => shareRecipe(favoriteRecipe, index) }
            >
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <span
              id={ index }
              className={ `${copied && indexNumber === index
                ? 'alert-show' : 'alert-hidden'}` }
              onTransitionEnd={ () => setCopied(false) }
            >
              Link copiado!
            </span>
          </div>
        ))}
    </main>
  );
  return (
    <div>
      {category === 'all' ? renderAllRecipes() : renderByCategory()}
    </div>
  );
}

Favorited.propTypes = {
  favoriteList: PropTypes.array,
  copied: PropTypes.bool,
  category: PropTypes.string,
  indexNumber: PropTypes.number,
  setCopied: PropTypes.func,
  shareRecipe: PropTypes.func,
  unfavoriteRecipe: PropTypes.func,
  unfavoriteFilteredRecipe: PropTypes.func,
}.isRequired;

export default Favorited;
