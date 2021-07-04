import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          alt="drinks-bottom-btn"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          alt="explore-bottom-btn"
          src={ exploreIcon }
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          alt="food-bottom-btn"
          src={ mealIcon }
        />

      </Link>
    </div>
  );
}

export default Footer;
