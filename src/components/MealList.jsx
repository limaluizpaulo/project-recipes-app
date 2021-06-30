import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import Context from '../context/Context';
import Meal from './Meal'

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    setShowMeals(true);
  },[mealsRecipes])

  const renderCards = () => {
    if (!mealsRecipes) {
      return <Alert variant="danger">Sinto muito, não encontramos nenhuma receita para esses filtros.</Alert>
    }

    if (mealsRecipes.length > 1) {
      return mealsRecipes.map((meal) => {
        return (<Meal meal={ meal } />)
      })
    };

    return history.push(`/comidas/${ mealsRecipes[0].idMeal} `);
  }

  return (
    <Container>
      { showMeals ? renderCards() : <h1>ferrou</h1> }
    </Container>
  );
}
