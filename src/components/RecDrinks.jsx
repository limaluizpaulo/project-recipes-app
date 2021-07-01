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
    <>
      <span>Bebidas</span>
      <Carousel>
        {
          recDrinks.map(({ strDrink, strDrinkThumb, idDrink }, key) => (
            <img
              data-testid={ `${key}-recomendation-card` }
              key={ idDrink }
              alt={ strDrink }
              src={ strDrinkThumb }
            />))
        }
      </Carousel>
    </>
  );
}

export default RecDrinks;
