import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { getFavoritesRecipes } from '../services/localStorage';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoriteIcon from '../components/FavoriteIcon';

const FavoriteRecipes = () => {
  const [filter, setFilter] = useState();
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    setFavorites(getFavoritesRecipes());
  }, []);

  const update = () => setFavorites(getFavoritesRecipes());

  const renderCards = () => favorites
    .filter(({ type }) => type === filter || !filter).map((item, index) => {
      const { id, category, name, image, area, alcoholicOrNot, type } = item;
      return (
        <div className="cardMade" key={ `${index} - ${name}` }>
          <Link to={ `${type}s/${id}` }>
            <button
              data-testid={ `${index}-horizontal-image` }
              // src={ image }
              alt="Receita"
              type="button"
            >
              <img className="recipe-photo" src={ image } alt={ name } />
            </button>
          </Link>
          <FavoriteIcon
            update={ update }
            recipe={ item }
            idTest={ `${index}-horizontal-favorite-btn` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot || `${area} - ${category}`}
          </p>
          <Link to={ `${type}s/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <ShareButton
            url={ `http://localhost:3000/${type}s/${id}` }
            msgShare={
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
              />
            }
          />
        </div>
      );
    });

  return (
    <div className="recipe recipeProgress">
      <nav>

        <Header title="Receitas Favoritas" />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </button>
      </nav>
      {favorites && renderCards()}
    </div>
  );
};

export default FavoriteRecipes;
