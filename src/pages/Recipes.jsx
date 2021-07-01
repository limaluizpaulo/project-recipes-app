import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';
import FilteredList from '../components/FilteredList';
import Card from '../components/Card';

function Recipes() {
  const { recipesFilter: { filteredRecipes },
    allRecipes: { recipes } } = useContext(RecipesContext);
  const history = useHistory();
  const NUMBER_OF_ITEMS = 12;

  useEffect(() => {
    if (filteredRecipes && filteredRecipes.length === 1) {
      history.push(`/comidas/${filteredRecipes[0].idMeal}`);
    }
  }, [filteredRecipes, history]);

  function renderRecipesDefault() {
    return (
      <div>
        {
          recipes.slice(0, NUMBER_OF_ITEMS)
            .map((recipe, index) => (<Card
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
              recipe={ recipe }
              index={ index }
            />))
        }
      </div>
    );
  }

  return (
    <>
      <h1>Receitas</h1>
      <SearchBar />
      {
        filteredRecipes.length === 0
          ? renderRecipesDefault()
          : <FilteredList filteredRecipes={ filteredRecipes } />
      }
    </>
  );
}

export default Recipes;
