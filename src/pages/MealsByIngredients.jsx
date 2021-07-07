import React, { useContext, useEffect, useState } from 'react';
import { Footer, Header, IngredientCard } from '../components';
import { MealsContext } from '../context/MealsProvider';
import fetchIngredients from '../services/api/fetchIngredients';

const MealsByIngredients = () => {
  const { setIngredientFilter } = useContext(MealsContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchIngredients();
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
            type="meal"
            ingredient={ ingredient }
            index={ i }
            set={ setIngredientFilter }
          />
        ))}
      <Footer />
    </div>
  );
};

export default MealsByIngredients;
