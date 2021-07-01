import React from 'react';
import Header from '../Components/Header';

function ExploreDrinks() {
  return (
    <div>
      <Header />
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </div>
  );
}

export default ExploreDrinks;
