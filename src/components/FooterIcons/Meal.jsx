import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';

function Meal() {
  return (
    <Col className="center-footer-icons">
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
      </Link>
    </Col>
  );
}

export default Meal;
