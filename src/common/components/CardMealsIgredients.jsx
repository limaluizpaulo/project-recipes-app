import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store, { addRecipes, setLoading } from '../../context/store';
import { fetchAPI, EXPLORER_ING_MEALS, INGREDIENT_MEALS } from '../../services';

export default function CardMealsIgredients() {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(store);
  const [dataCadsIgredientMeals, setDataCadsIgredientMeals] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_MEALS)
      .then((response) => setDataCadsIgredientMeals(response.meals));
  }, []);

  function setMeals(response) {
    const { drinks, categoriesMeals, categoriesDrinks } = recipes;
    setRecipes(setLoading(false));
    setRecipes(addRecipes(
      response.meals, drinks, categoriesMeals, categoriesDrinks,
    ));
  }

  function setIgredient(id) {
    console.log(id);
    fetchAPI(`${INGREDIENT_MEALS}${id}`)
      .then((response) => {
        setMeals(response);
        history.push('/comidas');
      });
  }

  const handleClick = ({ target: { id } }) => {
    setIgredient(id);
  };

  return (
    dataCadsIgredientMeals
      ? (
        <div>
          {dataCadsIgredientMeals.slice(0, '12')
            .map(({ idIngredient, strIngredient }, index) => (

              <div
                data-testid={ `${index}-ingredient-card` }
                id={ strIngredient }
                key={ idIngredient }
                onClick={ handleClick }
                onKeyDown={ handleClick }
                role="button"
                tabIndex={ index }
              >
                <div
                  className="imgContainer"
                >
                  <img
                    src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                    alt={ strIngredient }
                    data-testid={ `${index}-card-img` }
                    id={ strIngredient }
                    width="150px"
                  />
                  <span
                    data-testid={ `${index}-card-name` }
                    id={ strIngredient }
                  >
                    {strIngredient}

                  </span>
                </div>
              </div>
            ))}
        </div>) : <h5>Loading...</h5>
  );
}
