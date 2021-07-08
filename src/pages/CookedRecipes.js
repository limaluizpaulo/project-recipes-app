import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardRecipesDone from '../components/CardRecipesDone';
import Header from '../components/Header';

export default function CookedRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');

  return (
    <>
      <Header />
      <Button data-testid="filter-by-all-btn">All</Button>
      <Button data-testid="filter-by-food-btn">Food</Button>
      <Button data-testid="filter-by-drink-btn">Drinks</Button>
      {doneRecipes && doneRecipes.map((item, i) => (
        <Link
          key={ i }
          to={ item.type === 'comida' ? `/comida/${item.id}` : `/bebida/${item.id}` }
        >
          <CardRecipesDone mealOrDrink={ item } index={ i } />
        </Link>
      ))}
    </>
  );
}
