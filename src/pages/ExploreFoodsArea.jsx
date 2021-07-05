import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaRecipes, fetchRecipesByArea } from '../services/RecipesServices';
import RecipesContext from '../context/RecipesContext';

import '../styles/ExploreFoodArea.css';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [valueArea, setValueArea] = useState('All');
  const [recipesByArea, setRecipesByArea] = useState([]);

  const { allRecipes: { recipes } } = useContext(RecipesContext);

  useEffect(() => {
    async function getAreas() {
      const data = await fetchAreaRecipes();
      const areasItens = data.meals.map((area) => area.strArea);
      setAreas(areasItens);
    }

    getAreas();
  }, []);

  useEffect(() => {
    async function getRecipesByArea() {
      const NUMBER_OF_RECIPES = 12;
      if (valueArea !== 'All') {
        const data = await fetchRecipesByArea(valueArea);
        const twelveRecipes = data.meals.slice(0, NUMBER_OF_RECIPES);
        setRecipesByArea(twelveRecipes);
      } else {
        setRecipesByArea(recipes.slice(0, NUMBER_OF_RECIPES));
      }
    }

    getRecipesByArea();
  }, [valueArea, recipes]);

  function handleChange(event) {
    const { value } = event.target;

    setValueArea(value);
  }

  return (
    <>
      <Header profile name="Explorar Origem" search />

      <div className="input-select">
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
      </div>

      <section className="areas-field">
        {
          recipesByArea.map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="area"
            >
              <Link to={ `/comidas/${recipe.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h5 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h5>
              </Link>
            </div>
          ))
        }
      </section>

      <Footer />
    </>
  );
}

export default ExploreFoodsArea;
