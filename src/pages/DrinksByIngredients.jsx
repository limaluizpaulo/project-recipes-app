import React, { useEffect, useState } from 'react';
import { Header, IngredientCard } from '../components';
import fetchIngredients from '../services/api/fetchIngredients';

const DrinksByIngredients = () => {
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
          />
        ))}
    </div>
  );
};

export default DrinksByIngredients;