import React, { useEffect, useState } from 'react';
import { getDrinkRecipes } from '../services';
import './css/RecDrinks.css';

const SIX = 6;

function RecDrinks() {
  const [recDrinks, setRecDrinks] = useState([]);

  useEffect(() => {
    const fetchRecDrinks = async () => {
      const drink = await getDrinkRecipes();
      setRecDrinks(drink.slice(0, SIX));
    };
    fetchRecDrinks();
  }, []);

  return (
    <section className="carousel">
      <div className="carousel--slides">
        {
          recDrinks.map(({ strDrinkThumb, strDrink }, index) => (
            <>
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="carousel--slide"
              >
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
              </div>
              <h4
                data-testid={ `${index}-recomendation-title` }
              >
                {strDrink}
              </h4>
            </>
          ))
        }
      </div>
    </section>
  );
}

export default RecDrinks;
