import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { fetchMealsIngredients, fetchIngredientesMeal } from '../Service/foodApi';
import { fetchDrinksIngredients, fetchIngredientesDrinks } from '../Service/drinkApi';
import RecipesContext from '../Context/RecipesContext';

export default function CardIngredient() {
  const twelve = 12;
  const { pathname } = useLocation();
  let src = '';
  let positionInArray;

  const { setResponseApiLupaMeal,
    setResponseApiLupaDrink } = useContext(RecipesContext);
  const [ingredientArray, setIngredientsArray] = useState([]);

  if (pathname.includes('comidas')) {
    positionInArray = 1;
    src = 'https://www.themealdb.com/images/ingredients/';
  } else {
    positionInArray = 0;
    src = 'https://www.thecocktaildb.com/images/ingredients/';
  }

  const getApi = () => {
    if (pathname.includes('comidas')) {
      fetchMealsIngredients().then((response) => setIngredientsArray(response));
    } else {
      fetchDrinksIngredients().then((response) => setIngredientsArray(response));
    }
  };
  useEffect(getApi, []);
  let finalArray = ingredientArray;

  const fetchByingredient = ({ target, target: { nextSibling: { innerHTML } } }) => {
    if (pathname.includes('comidas')) {
      console.log(innerHTML, target);
      fetchIngredientesMeal(innerHTML).then((response) => setResponseApiLupaMeal(response));
    } else {
      fetchIngredientesDrinks(innerHTML).then((response) => setResponseApiLupaDrink(response));
    }
  };

  if (ingredientArray.length > twelve) {
    finalArray = ingredientArray.filter((_e, index) => index < twelve);
  }
  const path = positionInArray === 0 ? 'bebidas' : 'comidas';
  if (finalArray) {
    return (
      <main>
        <ul>
          {finalArray.map((obj, index) => (
            <Link to={ `/${path}` } key={ index } onClick={ fetchByingredient }>
              <li key={ index } data-testid={ `${index}-ingredient-card` }>
                <img
                  width="80px"
                  src={ `${src}${Object.values(obj)[positionInArray]}-Small.png` }
                  alt="imagem do ingrediente"
                  data-testid={ `${index}-card-img` }
                />
                <div data-testid={ `${index}-card-name` }>
                  { Object.values(obj)[positionInArray] }
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </main>
    );
  }
}
