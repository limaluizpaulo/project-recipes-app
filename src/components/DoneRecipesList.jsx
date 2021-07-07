import React, { useEffect, useState } from 'react';
import DoneRecipeCard from './DoneRecipeCard';
import ButtonFilter from './ButtonFilter';

function DoneRecipesList() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storedDoneRecipes);
    setFilteredDoneRecipes(storedDoneRecipes);
  }, []);

  useEffect(() => {
    // setFilteredDoneRecipes(doneRecipes);
  }, [filteredDoneRecipes]);

  function handleClick({ target: { value } }) {
    if (value !== 'All') {
      const selectedValues = value === 'Food'
        ? doneRecipes.filter((recipe) => recipe.type === 'comida')
        : doneRecipes.filter((recipe) => recipe.type === 'bebida');
      setFilteredDoneRecipes(selectedValues);
    } else {
      setFilteredDoneRecipes(doneRecipes);
    }
  }

  return (
    <div>
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

      { (filteredDoneRecipes && filteredDoneRecipes.length > 0)
        && filteredDoneRecipes.map((recipe, index) => (
          <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
        )) }
    </div>
  );
}

export default DoneRecipesList;
