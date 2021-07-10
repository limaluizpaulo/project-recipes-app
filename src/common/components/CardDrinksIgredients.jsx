import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, EXPLORER_ING_DRINKS, IMG_INGR_DRINKS } from '../../services';

export default function CardDrinksIgredients() {
  const [DataCadsIgredientDrinks, setDataCadsIgredientDrinks] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_DRINKS)
      .then((response) => setDataCadsIgredientDrinks(response.drinks));
  }, []);

  return (
    DataCadsIgredientDrinks
      ? (
        <div>
          {DataCadsIgredientDrinks.slice(0, '12').map((item, index) => (
            <Link
              to={ `/bebidas/${item.strIngredient1}` }
              key={ item.idMeal }

            >
              <div
                data-testid={ `${index}-ingredient-card` }
              >
                <div
                  className="imgContainer"
                >
                  <img
                    src={ `${IMG_INGR_DRINKS}${item.strIngredient1}.png` }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <span data-testid={ `${index}-card-name` }>{item.strIngredient1}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}
