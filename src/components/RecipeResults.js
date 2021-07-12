import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/RecipesContext';
import { fetchByCategory } from '../services/Categorys';
import RecipeCard from './RecipeCard';

function RecipeResults() {
  const { foodOrDrink, results, setResults, setType,
    type, searchInput, categoryFilter } = useContext(Context);
  const { name, fetchRecipe, idRecipe, categoryEndpoint, idType } = foodOrDrink;
  const history = useHistory();

  useEffect(() => {
    setType(history.location.pathname);
  });

  useEffect(() => {
    setResults([]);
    const getInicialRecipes = () => {
      fetchRecipe(name).then((data) => setResults(data));
    };

    getInicialRecipes();
  }, [name, setResults, fetchRecipe, searchInput]);

  useEffect(() => {
    setResults([]);
    const getRecipesByCategory = () => {
      if (categoryFilter !== '') {
        fetchByCategory(categoryEndpoint, categoryFilter, idType).then((data) => {
          setResults(data);
        });
      } else {
        fetchRecipe(name).then((data) => setResults(data));
      }
    };

    getRecipesByCategory();
  }, [categoryFilter, categoryEndpoint, idType]);

  const doze = 12;
  if (results.length > 1 || categoryFilter === 'Goat') {
    return (
      <div className="card-container">
        {results.slice(0, doze).map((recipe, i) => (
          <RecipeCard
            imagePath={ recipe[`str${idRecipe}Thumb`] }
            name={ recipe[`str${idRecipe}`] }
            index={ i }
            key={ i }
            link={ () => (
              history.push(`${type}/${recipe[`id${idRecipe}`]}`)
            ) }
          />
        ))}
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default RecipeResults;
