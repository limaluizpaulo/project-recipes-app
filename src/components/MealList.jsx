import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
// import Meal from './Meal';
import ItemCard from './ItemCard';

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);
  const maxRecipes = 12;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowMeals(true);
    }
  }, [mealsRecipes]);

  const renderCards = () => {
    if (mealsRecipes && mealsRecipes.lenght === 1) {
      console.log('3');
      return history.push(`/comidas/${mealsRecipes[0].idMeal} `);
    }

    if (mealsRecipes && mealsRecipes.lenght > 1) {
      const NUMBER = 12;
      return mealsRecipes.map((item, index) => {
        if (index < NUMBER) {
          return (<ItemCard key={ index } item={ item } i={ index } />);
    // if (mealsRecipes && mealsRecipes.length > 1) {
    //   console.log('1');
    //   return mealsRecipes.map((meal, index) => {
    //     if (index < maxRecipes) {
    //       return (<Meal key={ index } meal={ meal } index={ index } />);
    //     }
    //     return null;
    //   });
    // }

<<<<<<< HEAD
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
=======
    if (mealsRecipes && mealsRecipes.length === 1) {
      console.log('3');
      return history.push(`/comidas/${mealsRecipes[0].idMeal} `);
    }
>>>>>>> 8ea6a4befe48fc5e030d51cb5fba4197d2e3f091
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
