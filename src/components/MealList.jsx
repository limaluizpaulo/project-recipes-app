import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Context from '../context/Context';
import Meal from './Meal'
import Context from '../context/Context';

export default function MealList() {
  const { mealsRecipes } = useContext(Context);

  return (
    <Container>
      {
        mealsRecipes.map((meal) => {
          return <Meal meal={ meal } />
        })
      }
    </Container>
  );
}
