import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import Meal from './Meal';

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes } = useContext(Context);
  console.log(mealsRecipes);
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
    if (mealsRecipes && mealsRecipes.length === 1) {
      console.log('3');
      return history.push(`/comidas/${mealsRecipes[0].idMeal} `);
    }

    if (mealsRecipes && mealsRecipes.length > 1) {
      const NUMBER = 12;
      return mealsRecipes.map((meal, index) => {
        if (index < NUMBER) {
          return (<Meal key={ index } meal={ meal } index={ index } />);
        }
        return null;
      });
    }

    return null;
    // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
