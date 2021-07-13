import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../../components/ButtonFavorite/ButtonFavorite';
import ButtonShare from '../../components/ButtonShare/ButtonShare';
import Header from '../../components/Header/Header';
import './RecipesFavorites.css';

function RecipesFavorites() {
  const [filter, setFilter] = useState('all');

  const cardsFavorites = () => {
    const doneFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filted = doneFavorites
      .filter(({ type }) => type === filter || filter === 'all');

    return filted
      .map(({ image, category, name, area, alcoholicOrNot, type, id }, index) => (
        <div className="card-favorite" key={ index }>
          <Link to={ `/${type}/${id}` } className="link-img">
            <img
              src={ image }
              data-testid={ `${index}-horizontal-image` }
              alt="card recipe done"
            />
          </Link>

          <div className="detaisl-recipedone">
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${area} - ${category}`}
            </h6>
            <Link to={ `/${type}/${id}` }>
              <h5 data-testid={ `${index}-horizontal-name` }>{name}</h5>
            </Link>

            <h6 data-testid="1-horizontal-top-text">
              {alcoholicOrNot}
            </h6>

            <ButtonFavorite
              reload
              id={ id }
              dataTest={ `${index}-horizontal-favorite-btn` }
            />

            <ButtonShare
              path={ `http://localhost:3000/${type}/${id}` }
              dataTest={ `${index}-horizontal-share-btn` }
            />
          </div>

        </div>
      ));
  };

  return (
    <div id="page-drinks">
      <Header title="Receitas Favoritas" haveSrc={ false } />

      <div className="menu-box">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comidas') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebidas') }
        >
          Drinks
        </button>
      </div>

      {localStorage.getItem('favoriteRecipes') && cardsFavorites()}

      <div className="cards-recipes-done" />
    </div>

  );
}

export default RecipesFavorites;
