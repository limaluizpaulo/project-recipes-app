import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { getDrinkRecipes } from '../services';

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
    <section>
      <span>Bebidas</span>
      <Carousel>
        {
          recDrinks.map(({ strDrink, strDrinkThumb, idDrink }, key) => (
            <div key={ key }>
              <img
                data-testid={ `${key}-recomendation-card` }
                alt={ strDrink }
                src={ strDrinkThumb }
              />
              <h4 data-testid={ `${key}-recomendation-title` }>{strDrink}</h4>
              )
            </div>
          ))
        }
      </Carousel>
    </section>
  );
}

export default RecDrinks;
