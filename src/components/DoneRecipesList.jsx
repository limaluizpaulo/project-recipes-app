import React from 'react';
import DoneRecipeCard from './DoneRecipeCard';

function DoneRecipesList() {
  // receber o localStorage ou context
  const localStorageContext = [];
  return (
    <div>
      { localStorageContext.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}

export default DoneRecipesList;
