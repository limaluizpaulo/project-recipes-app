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
    <>
      <Header history={ history } title="Receitas Feitas" />
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
          <DoneRecipesCard />
        </section>
      </div>
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
