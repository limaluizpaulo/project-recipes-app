import React, { useContext } from 'react';
import { Container, Col, Image } from 'react-bootstrap';
import Context from '../context/Context';

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
