import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StoredRecipeCard from '../components/StoredRecipeCard';
import ButtonFilter from '../components/ButtonFilter';
import Header from '../components/Header';

function StoredRecipesList({ favorite }) {
  const [storedRecipes, setStoredRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem(
      favorite ? 'favoriteRecipes' : 'doneRecipes',
    ));
    setStoredRecipes(savedRecipes);
    setFilteredRecipes(savedRecipes);
  }, []);

  // useEffect(() => {
  //   // setFilteredDoneRecipes(doneRecipes);
  // }, [filteredDoneRecipes]);

  function handleClick({ target: { value } }) {
    if (value !== 'All') {
      const selectedValues = value === 'Food'
        ? storedRecipes.filter((recipe) => recipe.type === 'comida')
        : storedRecipes.filter((recipe) => recipe.type === 'bebida');
      setFilteredRecipes(selectedValues);
    } else {
      setFilteredRecipes(storedRecipes);
    }
  }

  return (
    <div>
      <Header
        title={ `Receitas ${favorite ? 'Favoritas' : 'Feitas'}` }
        search={ false }
      />
      <ButtonFilter nameBtn="All" btnFn={ handleClick } />
      <ButtonFilter nameBtn="Food" btnFn={ handleClick } />
      <ButtonFilter nameBtn="Drink" btnFn={ handleClick } />

      {/* <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClick }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
      >
        Drink
      </button> */}

      { (filteredRecipes && filteredRecipes.length > 0)
        && filteredRecipes.map((recipe, index) => (
          <StoredRecipeCard key={ index } recipe={ recipe } index={ index } />
        )) }
    </div>
  );
}

StoredRecipesList.propTypes = {
  favorite: PropTypes.bool.isRequired,
};

export default StoredRecipesList;
