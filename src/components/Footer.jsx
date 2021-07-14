import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <nav data-testid="footer" className="footer-navBar">
        <Link to="/bebidas">
          <img
            src={ drinkIcon }
            alt="Drink"
            data-testid="drinks-bottom-btn"
            className="footer-icon"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="Explore"
            data-testid="explore-bottom-btn"
            className="footer-icon"
          />
        </Link>
        <Link to="/comidas">
          <img
            src={ mealIcon }
            alt="Meal"
            data-testid="food-bottom-btn"
            className="footer-icon"
          />
        </Link>
      </nav>
    );
  }
}

export default Footer;
