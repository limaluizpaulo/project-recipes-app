import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { fetchIngredientesRecipes } from '../services/RecipesAPI';

import '../components/style/IngredientsMeal.css';

function IngredientMeals() {
  const { filterByIngredients, redirectToMainScreen,
    setRedirectToMainScreen } = useContext(RecipesContext);

  const DOZE = 12;
  const [ingredients, setIngredients] = useState([]);
  const [maxCards/* setMaxCards */] = useState(DOZE);

  const getIngredients = async () => {
    const { meals } = await fetchIngredientesRecipes('meals');
    setIngredients(meals);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setRedirectToMainScreen(false), []);

  const imgUrl = 'https://www.themealdb.com/images/ingredients/';
  return (
    <div>
      { redirectToMainScreen && <Redirect to="/comidas" /> }

      { ingredients.slice(0, maxCards).map(({ idIngredient, strIngredient }, index) => (
        <label
          data-testid={ `${index}-ingredient-card` }
          key={ idIngredient }
          htmlFor={ strIngredient }
          className="optionIngredients"
        >
          <input
            type="radio"
            onClick={ () => filterByIngredients(strIngredient) }
            id={ strIngredient }
            className="search-icon-radio"
          />
          <img
            data-testid={ `${index}-card-img` }
            src={ `${imgUrl}${strIngredient}-Small.png` }
            alt={ strIngredient }
            className="cardImage"
          />
          <p data-testid={ `${index}-card-name` }>
            { strIngredient }
          </p>
        </label>
      )) }
    </div>
  );
}

export default IngredientMeals;
