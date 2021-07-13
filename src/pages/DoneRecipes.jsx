import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Context from '../context/Context';
import '../styles/doneRecipes.css';

// Tela de receitas feitas: /receitas-feitas
export default function DoneRecipes({ history }) {
  const { setSelectedTypeItem } = useContext(Context);

  const setFilterRecipesDone = (data) => {
    setSelectedTypeItem(data);
  };

  return (
    <div className="foodPagee">
      <Header history={ history } title="Receitas Feitas" />
      <section className="food__category__container">
        <button
          type="button"
          className="food__category__buttonn"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterRecipesDone('all') }
        >
          All
        </button>
        <button
          type="button"
          className="food__category__buttonn"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterRecipesDone('bebida') }
        >
          Foods
        </button>
        <button
          type="button"
          className="food__category__buttonn"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterRecipesDone('comida') }
        >
          Drinks
        </button>
      </section>
      <section className="food__cards__container">
        <DoneRecipesCard />
      </section>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
