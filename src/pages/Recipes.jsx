import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { recipesFilter: { filteredRecipes } } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (filteredRecipes.length === 1) {
      history.push(`/comidas/${filteredRecipes[0].idMeal}`);
    }
  }, [filteredRecipes, history]);

  return (
    <>
      <h1>Receitas</h1>
      <SearchBar />
    </>
  );
}

export default Recipes;
