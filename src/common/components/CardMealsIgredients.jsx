import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, INGREDIENT_MEALS } from '../../services';

export default function CardMealsIgredients() {
  const [dataCadsIgredientMeals, setDataCadsIgredientMeals] = useState([]);

  useEffect(() => {
    fetchAPI(INGREDIENT_MEALS)
      .then((response) => setDataCadsIgredientMeals(response.meals));
  }, []);

  return (
    dataCadsIgredientMeals
      ? (
        <div>
          {dataCadsIgredientMeals.slice(0, '12').map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.idMeal }

            >
              <div
                data-testid={ `${index}-ingredient-card` }
              >
                <div
                  className="imgContainer"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}
