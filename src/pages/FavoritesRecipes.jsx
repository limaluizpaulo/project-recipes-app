import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';
import '../styles/favoriteRecipes.css';

import FavoriteRecipesCard from '../components/FavoritesRecipesCard';

// Tela de receitas favoritas: /receitas-favoritas
export default function FavoritesRecipes({ history }) {
  const { setSelectedTypeItem } = useContext(Context);

  const setFilterRecipesDone = (data) => {
    setSelectedTypeItem(data);
  };

  return (
    <>
      <Header history={ history } title="Receitas Favoritas" />
      <div className="foodPages__favorites">
        <section className="food__category__container">
          <button
            type="button"
            className="food__category__button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterRecipesDone('all') }
          >
            All
          </button>
          <button
            type="button"
            className="food__category__button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilterRecipesDone('bebida') }
          >
            Foods
          </button>
          <button
            type="button"
            className="food__category__button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilterRecipesDone('comida') }
          >
            Drinks
          </button>
        </section>
        <section className="food__cards__container">
          <FavoriteRecipesCard />
        </section>
      </div>
    </>
  );
}

FavoritesRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
