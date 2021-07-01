import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { fetchIngredientesRecipes } from '../services/RecipesAPI';

import '../components/style/IngredientsMeal.css';

function IngredientDrink() {
  const { filterByIngredients, redirectToMainScreen,
    setRedirectToMainScreen } = useContext(RecipesContext);

  const DOZE = 12;
  const [ingredients, setIngredients] = useState([]);
  const [maxCards/* setMaxCards */] = useState(DOZE);

  const getIngredients = async () => {
    const { drinks } = await fetchIngredientesRecipes('drinks');
    setIngredients(drinks);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setRedirectToMainScreen(false), []);

  const imgUrl = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      { redirectToMainScreen && <Redirect to="/comidas" /> }
      { ingredients.slice(0, maxCards).map(({ strIngredient1 }, index) => (
        <label
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          htmlFor={ strIngredient1 }
          className="optionIngredients"
        >
          <input
            type="radio"
            onClick={ () => filterByIngredients(strIngredient1) }
            id={ strIngredient1 }
            className="search-icon-radio"
          />
          <img
            data-testid={ `${index}-card-img` }
            src={ `${imgUrl}${strIngredient1}-Small.png` }
            alt={ strIngredient1 }
            className="cardImage"
          />
          <p data-testid={ `${index}-card-name` }>
            { strIngredient1 }
          </p>
        </label>
      )) }
    </div>
  );
}

export default IngredientDrink;
