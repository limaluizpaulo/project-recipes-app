import React, { useEffect, useState } from 'react';
import { getMealDetails, getDrinkDetails } from '../services';
import { checkDoneRecipes, checkProgress } from '../services/localStorageManager';
import './FoodDetails.css';
import {
  RecDrinks,
  RecFoods,
  MealClip,
  IngList,
  FavoriteBtn,
  ShareBtn } from '../components';

function FoodDetails({ match, history }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  const [details, setDetails] = useState([{}]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measures, setMeasure] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [donerecipe, setDoneRecipe] = useState(true);
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname.includes('/comidas')) {
        const meal = await getMealDetails(id);
        setDetails(meal);
        setIsStarted(checkProgress(id, 'meals'));
        setType('meals');
      }
      if (pathname.includes('bebidas')) {
        const drink = await getDrinkDetails(id);
        setDetails(drink);
        setIsStarted(checkProgress(id, 'cocktails'));
        setType('drinks');
      }
    };
    fetchDetails();
    setDoneRecipe(checkDoneRecipes(id));
  }, [pathname, id]);

  useEffect(() => {
    const objKeys = Object.keys(details[0]);

    const ingredientName = objKeys.filter((key) => key.includes('strIngredient'));
    const ingredientMeasures = objKeys.filter((key) => key.includes('strMeasure'));

    const ingredientItems = [];
    const ingredientQuanti = [];

    ingredientName.forEach((item) => {
      if (details[0][item] !== '' || undefined) {
        ingredientItems.push(details[0][item]);
      }
    });
    setIngredientsList(ingredientItems);

    ingredientMeasures.forEach((item) => {
      if (details[0][item] !== '' || undefined) {
        ingredientQuanti.push(details[0][item]);
      }
    });
    setMeasure(ingredientQuanti);
  }, [details]);

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

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
      <FavoriteBtn id={ id } type={ type } currentRecipe={ details[0] } />
      <ShareBtn showCopiedMsg={ setWasCopied } />
      {wasCopied && <span>Link copiado!</span>}
      <div>
        {
          strAlcoholic
            ? <h4 data-testid="recipe-category">Alcoholic</h4>
            : <h4 data-testid="recipe-category">{strCategory}</h4>
        }
        <p data-testid="instructions">{strInstructions}</p>
        <IngList ingredientsList={ ingredientsList } measures={ measures } />
        <div>
          <MealClip strYoutube={ strYoutube } />
        </div>
        {
          pathname.includes('/comida')
            ? <RecDrinks id={ id } />
            : <RecFoods id={ id } />
        }
      </div>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ startRecipe }
        style={ { visibility: donerecipe ? 'hidden' : 'visible' } }
      >
        {
          isStarted
            ? 'Continuar Receita'
            : 'Iniciar Receita'
        }
      </button>
      )
    </>
  );
}

export default FoodDetails;
