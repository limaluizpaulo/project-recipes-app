import React from 'react';
import Header from '../components/Header';

const RecipesMade = () => {
  console.log('');
  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn" />
      <Header title="Receitas Feitas" />
      <h1>Recipe Mades</h1>
    </div>
  );
};

export default RecipesMade;
