import React, { useContext } from 'react';
import RecipeContext from '../context';
import RecipesDrinksCard from './RecipesDrinksCard';

export default function RecipesDrinksList() {
  const { recipes } = useContext(RecipeContext);
  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipesDrinksCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </div>
  );
}
