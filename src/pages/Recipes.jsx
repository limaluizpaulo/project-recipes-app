import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';
import FilteredList from '../components/FilteredList';

function Recipes() {
  const { recipesFilter: { filteredRecipes } } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (filteredRecipes && filteredRecipes.length === 1) {
      history.push(`/comidas/${filteredRecipes[0].idMeal}`);
    }
  }, [filteredRecipes, history]);

  return (
    <>
      <h1>Receitas</h1>
      <SearchBar />
      <FilteredList filteredRecipes={ filteredRecipes } />
    </>
  );
}

export default Recipes;
