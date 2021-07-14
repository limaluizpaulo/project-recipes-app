import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/contextRecipes';

function RecommendedDrinks() {
  const { drinksRec, setDrinksRec } = useContext(ContextRecipes);
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setDrinksRec(response.drinks));
  }, [setDrinksRec]);
  console.log(drinksRec);

  return (
    <section>
      { drinksRec.map(({ strDrink, strDrinkThumb }, index) => index < 2
            && (
              <div>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  width="150px"
                  data-testid="recipe-photo"
                />
                <p data-testid="recipe-title">{ strDrink }</p>
              </div>)) }
    </section>
  );
}

export default RecommendedDrinks;
