import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import ItemCard from './ItemCard';

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes, resquestMealsApi } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    resquestMealsApi();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log(isInitialMount.current);
    } else {
      console.log('show');
      setShowMeals(true);
    }
  }, [mealsRecipes]);

  const renderCards = () => {
    if (mealsRecipes && mealsRecipes.length === 1) {
      console.log('3');
      return history.push(`/comidas/${mealsRecipes[0].idMeal} `);
    }

    if (mealsRecipes && mealsRecipes.length > 1) {
      const NUMBER = 12;
      return mealsRecipes.map((item, index) => {
        if (index < NUMBER) {
          return (<ItemCard key={ index } item={ item } i={ index } />);
        }
        return null;
      });
    }

    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
