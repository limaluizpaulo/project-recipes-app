import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';

import HeaderDetails from '../components/HeaderDetails';
import IngredientsDetails from '../components/IngredientsDetails';

function DrinkDetail() {
  const { id } = useParams();
  const {
    drinkDetails,
    setDrinkDetails,
    fetchDrinksById,
    setIngredientsDrink,
  } = useContext(DrinksContext);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const drink = async () => {
      const fetch = await fetchDrinksById(id);
      setDrinkDetails(fetch[0]);
      setLoad(false);
    };
    drink();
  });

  useEffect(() => {
    const SIZE = -1;
    const keysIngredients = Object.keys(drinkDetails)
      .map((key) => (key.indexOf('strIngredient') > SIZE ? drinkDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const quantity = Object.keys(drinkDetails)
      .map((key) => (key.indexOf('strMeasure') > SIZE ? drinkDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const full = quantity.map((item, index) => `${item} ${keysIngredients[index]}`);

    setIngredientsDrink(full);
  }, [drinkDetails, setIngredientsDrink]);
  return !load ? (
    <>
      <HeaderDetails />
      <main>
        <IngredientsDetails />
        {/*         <section className="Ingredients">
          <h1>Ingredients</h1>
          <div>
            <ul>
              {ingredients.map((item, index) => (
                <li
                  key={ item }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section> */}
        <section className="Instructions">
          <h1>Instructions</h1>
          <div>
            <p data-testid="instructions">{drinkDetails.strInstructions}</p>
          </div>
        </section>
        {/*         <section>
          <h1>Recomendadas</h1>
          <div>
            {
              recipes.slice(0, NUMBER_OF_ITEMS)
                .map((recipe, index) => (
                  <div
                    className="card-field"
                    data-testid={ `${index}-recipe-card` }
                    key={ index }
                  >
                    <Link to={ `/comidas/${recipe.idMeal}` }>
                      <img
                        data-testid={ `${index}-recomendation-card` }
                        src={ recipe.strMealThumb }
                        alt={ recipe.strMeal }
                      />
                      <span data-testid="recipe-category">{ recipe.strCategory }</span>
                      <h5 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h5>
                    </Link>
                  </div>
                ))
            }
          </div>
        </section> */}
        <button type="button" data-testid="start-recipe-btn">
          <span>Iniciar Receita</span>
        </button>

      </main>

      <p>Bebidas</p>
    </>
  ) : <h1>Loading</h1>;
}

export default DrinkDetail;
