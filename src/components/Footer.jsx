import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Navbar, Row, Col } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <Navbar data-testid="footer" fixed="bottom">
        <Row>
          <Col xs>
            <Link to="/bebidas">
              <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
            </Link>
          </Col>
          <Col xs>
            <Link to="/explorar">
              <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
            </Link>
          </Col>
          <Col xs>
            <Link to="/comidas">
              <img src={ mealIcon } alt="Meal" data-testid="food-bottom-btn" />
            </Link>
          </Col>
        </Row>
      </Navbar>
    );
  }
}

export default Footer;
