import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';

import FavoriteRecipesCard from '../components/FavoritesRecipesCard';

// Tela de receitas favoritas: /receitas-favoritas
export default function FavoritesRecipes({ history }) {
  const { setSelectedTypeItem } = useContext(Context);

  const setFilterRecipesDone = (data) => {
    setSelectedTypeItem(data);
  };

  return (
    <div>
      <Header history={ history } title="Receitas Favoritas" />
      <section className="profile-buttons">
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterRecipesDone('all') }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterRecipesDone('bebida') }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn btn-sm color-button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterRecipesDone('comida') }
        >
          Drinks
        </button>
      </section>
      <section>
        <FavoriteRecipesCard />
      </section>
    </div>
  );
}

FavoritesRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
