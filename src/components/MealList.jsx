import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import Meal from './Meal';

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowMeals(true);
    }
  }, [mealsRecipes]);

  const renderCards = () => {
    if (!mealsRecipes.length) {
      return null;
      // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (mealsRecipes && mealsRecipes.length > 1) {
      console.log('1');
      return mealsRecipes.map((meal, index) => {
        if (index < 12) {
          return (<Meal key={ index } meal={ meal } index={ index } />);
        };
        return null;
      });
    }

    if (mealsRecipes && mealsRecipes.length === 1) {
      console.log('3');
      return history.push(`/comidas/${mealsRecipes[0].idMeal} `);
    }
    
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
