import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

function RecipeResults() {
  const { foodOrDrink, results, setResults, setType,
    type, searchInput } = useContext(Context);
  const { name, fetchRecipe, idRecipe } = foodOrDrink;

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

  const doze = 12;
  if (results.length > 1) {
    return (
      <div className="card-container">
        {results.slice(0, doze).map((recipe, i) => (
          <RecipeCard
            imagePath={ recipe[`str${idRecipe}Thumb`] }
            name={ recipe[`str${idRecipe}`] }
            index={ i }
            key={ recipe[`id${idRecipe}`] }
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
