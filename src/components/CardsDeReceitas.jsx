import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';

function CardsDeReceitas({ receitas }) {
  const check = Object.keys(receitas[0]);
  const renderCard = (id, strThumb, str) => (
    <Col key={ id }>
      <Card data-testid={ `${id}-recipe-card` }>
        <Card.Img
          variant="top"
          src={ strThumb }
          alt={ str }
          data-testid={ `${id}-card-img` }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${id}-card-name` }
          >
            { str }
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );

  if (check[0] === 'idDrink') {
    return (
      <Row xs={ 2 } md={ 4 }>
        {receitas.map(({ strDrinkThumb, strDrink }, index) => (
          renderCard(index, strDrinkThumb, strDrink)
        ))}
      </Row>
    );
  }

  if (check[0] === 'idMeal') {
    return (
      <Row xs={ 2 } md={ 4 }>
        {receitas.map(({ strMealThumb, strMeal }, index) => (
          renderCard(index, strMealThumb, strMeal)
        ))}
      </Row>
    );
  }
}

export default CardsDeReceitas;

CardsDeReceitas.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.object).isRequired,
};
