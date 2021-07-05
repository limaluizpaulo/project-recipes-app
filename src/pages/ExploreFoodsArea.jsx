import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaRecipes, fetchRecipesByArea } from '../services/RecipesServices';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [valueArea, setValueArea] = useState('All');
  const [recipesByArea, setRecipesByArea] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getAreas() {
      const NUMBER_OF_AREAS = 12;
      const data = await fetchAreaRecipes();
      const twelveAreas = data.meals.slice(0, NUMBER_OF_AREAS);
      const areasItens = twelveAreas.map((area) => area.strArea);
      setAreas(areasItens);
    }
    getAreas();
  }, []);

  useEffect(() => {
    async function getRecipesByArea() {
      if (valueArea !== 'All') {
        const NUMBER_OF_RECIPES = 12;
        const data = await fetchRecipesByArea(valueArea);
        const twelveRecipes = data.meals.slice(0, NUMBER_OF_RECIPES);
        setRecipesByArea(twelveRecipes);
      }
    }
    getRecipesByArea();
  }, [valueArea]);

  function handleChange(event) {
    const { value } = event.target;
    setValueArea(value);
  }

  function handleClick(idMeal) {
    history.push(`/comidas/${idMeal}`);
  }

  return (
    <>
      <Header profile name="Explorar Origem" search />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option data-testid="All-option" value="All">All</option>
        {
          areas.map((area, index) => (
            <option
              data-testid={ `${area}-option` }
              key={ index }
              value={ area }
            >
              {area}
            </option>
          ))
        }
      </select>

      <section>
        {
          recipesByArea.map((recipe, index) => (
            <button
              type="button"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => handleClick(recipe.idMeal) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <h6 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h6>

            </button>
          ))
        }
      </section>
      <Footer />
    </>
  );
}

export default ExploreFoodsArea;
