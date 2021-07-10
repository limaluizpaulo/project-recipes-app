import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, EXPLORER_ING_MEALS } from '../../services';

export default function CardMealsIgredients() {
  const [dataCadsIgredientMeals, setDataCadsIgredientMeals] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_MEALS)
      .then((response) => setDataCadsIgredientMeals(response.meals));
  }, []);

  return (
    dataCadsIgredientMeals
      ? (
        <div>
          {dataCadsIgredientMeals.slice(0, '12').map((item, index) => (
            <Link
              to={ `/comidas/${item.strIngredient}` }
              key={ item.idIngredient }

            >
              <div
                data-testid={ `${index}-ingredient-card` }
              >
                <div
                  className="imgContainer"
                >
                  <img
                    src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}.png` }
                    alt={ item.strIngredient }
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <span data-testid={ `${index}-card-name` }>{item.strIngredient}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}
