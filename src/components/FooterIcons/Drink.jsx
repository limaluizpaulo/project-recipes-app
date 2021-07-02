import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';

function Drink() {
  return (
    <Col className="center-footer-icons">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </Link>
    </Col>
  );
}

export default Drink;
