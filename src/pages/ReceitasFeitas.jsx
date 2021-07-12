import React from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  ReceitasFeitas.displayName = 'Receitas Feitas';
  return (
    <div>
      <Header title={ ReceitasFeitas.displayName } />
      <button type="button" data-testid="filter-by-all-btn"> All </button>
      <button type="button" data-testid="filter-by-food-btn"> Food</button>
      <button type="button" data-testid="filter-by-drink-btn"> Drinks </button>
      cardDone()
    </div>
  );
}

export default ReceitasFeitas;
