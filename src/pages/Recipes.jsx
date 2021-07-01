import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';
import FilteredList from '../components/FilteredList';
import Card from '../components/Card';

function Recipes() {
  const { recipesFilter: { filteredRecipes },
    allRecipes: { recipes }, allCategories: { categories }, recipesFilteredByCategory:
    { recipesByCategory }, setCategory, category, setIsFiltred, isFiltred,
  } = useContext(RecipesContext);

  const history = useHistory();
  const NUMBER_OF_ITEMS = 12;
  const NUMBER_OF_CATEGORIES = 5;

  useEffect(() => {
    if (filteredRecipes && filteredRecipes.length === 1) {
      history.push(`/comidas/${filteredRecipes[0].idMeal}`);
    }
  }, [filteredRecipes, history]);

  function renderRecipesDefault() {
    if (!recipesByCategory && isFiltred === false) {
      return (
        <div>
          {
            recipes.slice(0, NUMBER_OF_ITEMS)
              .map((recipe, index) => (<Card
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
              />))
          }
        </div>
      );
    }
    return (
      <div>
        {
          recipesByCategory.slice(0, NUMBER_OF_ITEMS)
            .map((recipe2, index2) => (<Card
              key={ recipe2.idMeal }
              recipe={ recipe2 }
              index={ index2 }
            />))
        }
      </div>
    );
  }

  function renderButtonCategories() {
    return (
      <div>
        <Button
          data-testid="All-category-filter"
          onClick={ (event) => setCategory(event.target.innerText) }
        >
          All
        </Button>
        {
          categories.slice(0, NUMBER_OF_CATEGORIES)
            .map((categoryRecipes, index) => (
              <Button
                key={ index }
                data-testid={ `${categoryRecipes.strCategory}-category-filter` }
                onClick={ (event) => {
                  setIsFiltred(false);
                  if (category === event.target.innerText) {
                    setCategory('All');
                  } else {
                    setCategory(event.target.innerText);
                  }
                } }
              >
                {categoryRecipes.strCategory}
              </Button>
            ))
        }
      </div>
    );
  }

  return (
    <>
      <h1>Receitas</h1>
      <SearchBar />

      {renderButtonCategories()}

      {
        isFiltred ? <FilteredList filteredRecipes={ filteredRecipes } />
          : renderRecipesDefault()
      }

    </>
  );
}

export default Recipes;
