import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import IngredientCard from './IngredientCard';

export default function IngredientList({ type }) {
  const [showMeals, setShowMeals] = useState(false);
  const { ingredients, getIngredients } = useContext(Context);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowMeals(true);
    }
  }, [ingredients]);

  useEffect(() => {
    getIngredients(type);
  }, []);

  const renderCards = () => {

    return ingredients.map((item, index) => {
      return (
        <IngredientCard
          key={ index }
          item={ item }
          i={ index }
          type={ type }
        />);
    });
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
