import React, { useContext } from 'react';
import RecipeContext from '../context';
import RecipesMealCard from './RecipesMealCard';

export default function RecipesMealList() {
  const { recipes } = useContext(RecipeContext);

  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipesMealCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </div>
  );
}
