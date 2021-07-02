import React, { useEffect, useState } from 'react';
import { getMealDetails, getDrinkDetails } from '../services';

import { RecDrinks, RecFoods, MealClip, IngList } from '../components';

function FoodDetails({ match, history }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  const [details, setDetails] = useState([{}]);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname.includes('/comida')) {
        const meal = await getMealDetails(id);
        setDetails(meal);
      } else {
        const drink = await getDrinkDetails(id);
        setDetails(drink);
      }
    };
    fetchDetails();
  }, [pathname, id]);

  useEffect(() => {
    const objKeys = Object.keys(details[0]);

    const ingredientKeys = objKeys.filter((key) => key.includes('strIngredient'));

    const ingredientItems = [];

    ingredientKeys.forEach((item) => {
      if (details[0][item] !== '' || undefined) {
        ingredientItems.push(details[0][item]);
      }
    });
    setIngredientsList(ingredientItems);
  }, [details]);

  const {
    strCategory,
    strYoutube,
    strAlcoholic,
    strMeal,
    strDrink,
    strInstructions,
    strMealThumb,
    strDrinkThumb } = details[0];

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar receita
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar receita
      </button>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
      <div>
        <h4 data-testid="recipe-category">{strCategory}</h4>
        {
          strAlcoholic
            ? <h4>Alcoholic</h4>
            : <span />
        }
        <p data-testid="instructions">{strInstructions}</p>
        <IngList ingredientsList={ ingredientsList } />
        <div>
          <MealClip strYoutube={ strYoutube } />
        </div>
        {
          pathname.includes('/comida')
            ? <RecDrinks id={ id } />
            : <RecFoods id={ id } />
        }
      </div>
    </>
  );
}

export default FoodDetails;
