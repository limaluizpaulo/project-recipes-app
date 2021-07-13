import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CardRecipesDone from '../components/CardRecipesDone';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [renderer, setRenderer] = useState([]);
  const [allDone, setAllDone] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setAllDone(doneRecipes);
    setRenderer(doneRecipes);
  }, []);

  function handleAllBtn() {
    setRenderer(allDone);
  }

  function handleFoodBtn() {
    const foodsRecipes = allDone.filter((recipes) => recipes.type === 'comida');
    setRenderer(foodsRecipes);
  }

  function handleDrinksBtn() {
    const drinksRecipes = allDone.filter((recipes) => recipes.type === 'bebida');
    setRenderer(drinksRecipes);
  }

  return (
    <>
      <Header />
      <Button onClick={ handleAllBtn } data-testid="filter-by-all-btn">All</Button>
      <Button onClick={ handleFoodBtn } data-testid="filter-by-food-btn">Food</Button>
      <Button
        onClick={ handleDrinksBtn }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </Button>
      { renderer && renderer.map((item, i) => (
        <CardRecipesDone key={ i } mealOrDrink={ item } index={ i } />
      ))}
    </>
  );
}
