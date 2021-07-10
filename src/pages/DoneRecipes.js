import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CardRecipesDone from '../components/CardRecipesDone';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [done, setDone] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(doneRecipes);
  }, []);

  return (
    <>
      <Header />
      <Button data-testid="filter-by-all-btn">All</Button>
      <Button data-testid="filter-by-food-btn">Food</Button>
      <Button data-testid="filter-by-drink-btn">Drinks</Button>
      { done && done.map((item, i) => (
        <CardRecipesDone key={ i } mealOrDrink={ item } index={ i } />
      ))}
    </>
  );
}
