import React, { useContext, useEffect, useState } from 'react';
import { Footer, Header, IngredientCard } from '../components';
import { DrinksContext } from '../context/DrinksProvider';
import fetchIngredients from '../services/api/fetchIngredients';

const DrinksByIngredients = () => {
  const { setIngredientFilter } = useContext(DrinksContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchIngredients('drinks');
      setIngredients(res);
    };
    load();
  }, []);

  return (
    <div>
      <Header name="Explorar Ingredientes" />
      {ingredients
        .map((ingredient, i) => (
          <IngredientCard
            key={ i }
            type="cocktail"
            ingredient={ ingredient }
            index={ i }
            set={ setIngredientFilter }
          />
        ))}
      <Footer />
    </div>
  );
};

export default DrinksByIngredients;
