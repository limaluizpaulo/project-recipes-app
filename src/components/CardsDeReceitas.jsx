import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CardsDeReceitas({ receitas, typeReceita }) {
  const renderCard = (key, strThumb, str, id) => (
    <Link className="cardLink" to={ `/${typeReceita}/${id}` }>
      <Col key={ key }>
        <Card data-testid={ `${key}-recipe-card` }>
          <Card.Img
            variant="top"
            src={ strThumb }
            alt={ str }
            data-testid={ `${key}-card-img` }
          />
          <Card.Body>
            <Card.Title
              data-testid={ `${key}-card-name` }
            >
              { str }
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );

  if (typeReceita === 'bebidas') {
    return (
      <Row xs={ 2 } md={ 4 }>
        {receitas.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
          renderCard(index, strDrinkThumb, strDrink, idDrink)
        ))}
      </Row>
    );
  }

  if (typeReceita === 'comidas') {
    return (
      <Row xs={ 2 } md={ 4 }>
        {receitas.map(({ strMealThumb, strMeal, idMeal }, index) => (
          renderCard(index, strMealThumb, strMeal, idMeal)
        ))}
      </Row>
    );
  }
}

export default CardsDeReceitas;

CardsDeReceitas.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.object).isRequired,
};
