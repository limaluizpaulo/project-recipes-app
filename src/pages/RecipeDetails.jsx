import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchMealById } from '../services/mealsApi';
import { fetchDrinkById } from '../services/drinksApi';
import HeaderDetails from '../components/HeaderDetails';
import Ingredients from '../components/Ingredients';
import Recomendations from '../components/Recomendations';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { pathname } = useHistory().location;
  const { idMeal, idDrink, strMeal, strYoutube } = recipe;

  useEffect(() => {
    if (pathname.includes('/comidas')) {
      fetchMealById(id).then((data) => setRecipe(...data));
    }
    if (pathname.includes('/bebidas')) {
      fetchDrinkById(id).then((data) => setRecipe(...data));
    }
  }, [id, pathname]);

  return (
    <div>
      <HeaderDetails recipe={ recipe } pathname={ pathname } />
      <section className="ingredients">
        <Ingredients recipe={ recipe } />
      </section>

      {/* ReactPlayer based on: https://www.youtube.com/watch?v=7sDY4m8KNLc */}

      {strMeal && <ReactPlayer url={ strYoutube } controls data-testid="video" />}
      <div>
        <Recomendations strMeal={ strMeal } />
      </div>
      <div className="btn-start-container">
        <Link
          to={
            idMeal
              ? `/comidas/${idMeal}/in-progress`
              : `/bebidas/${idDrink}/in-progress`
          }
        >
          <button
            className="btn-start"
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </Link>
      </div>
    </div>
  );
}
