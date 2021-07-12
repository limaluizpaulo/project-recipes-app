import React from 'react';
import { useLocation } from 'react-router-dom';

import RecipesInProgressMeals from '../components/RecipesInProgressMeals';
import RecipesInProgressDrink from '../components/RecipesInProgressDrink';

export default function InProgress() {
  const { pathname } = useLocation();
  return (
    <main>
      {pathname.includes('/comidas')
        ? <RecipesInProgressMeals /> : <RecipesInProgressDrink />}
    </main>
  );
}
