import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import Header from '../components/Header';
import BodyRecipesDone from '../components/BodyRecipesDone';

export default function RecipesDone({ history }) {
  const [whatIsActivated, setWhatIsActivated] = useState(0);
  const rawDestructuredStorage = localStorage.getItem('doneRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage);
  const attStateFilter = (selected) => {
    setWhatIsActivated(selected);
  };
  const renderFilteredList = () => {
    let filteredList = [];
    if (whatIsActivated === 0) {
      filteredList = destructuredStorage;
    }
    if (whatIsActivated === 1) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'comida');
    }
    if (whatIsActivated === 2) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'bebida');
    }
    return (filteredList.map((each, index) => {
      if (whatIsActivated === 0) {
        return <BodyRecipesDone index={ index } history={ history } each={ each } />;
      }
      if (whatIsActivated === 1/*  && each.type === 'comida' */) {
        return <BodyRecipesDone index={ index } history={ history } each={ each } />;
      }
      if (whatIsActivated === 2/*  && each.type === 'bebida' */) {
        return <BodyRecipesDone index={ index } history={ history } each={ each } />;
      }
      return null;
    }));
  };
  return (
    <>
      <Header title="Receitas Feitas" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => attStateFilter(0) }
        type="button"
      >
        Todas
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ () => attStateFilter(1) }
        type="button"
      >
        Comidas
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => attStateFilter(2) }
        type="button"
      >
        Bebidas
      </button>
      {renderFilteredList()}
    </>
  );
}

RecipesDone.propTypes = {
  history: PropTypes.shape().isRequired,
};
