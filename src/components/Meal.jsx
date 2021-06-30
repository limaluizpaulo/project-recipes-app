import React from 'react';
import { Card } from 'react-bootstrap';

export default function Meal({ meal : { strMeal, strMealThumb } }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={ strMealThumb } />
      <Card.Body>
        <Card.Title>{ strMeal }</Card.Title>
      </Card.Body>
    </Card>
  );
}
