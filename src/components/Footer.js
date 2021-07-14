import React from 'react';
import { Link } from 'react-router-dom';

import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <Link to="/bebidas">
        <img
          className="footer-image"
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          alt="drinks"
        />
      </Link>
      <Link to="/explorar">
        <img
          className="footer-image"
          data-testid="explore-bottom-btn"
          src={ ExploreIcon }
          alt="explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          className="footer-image"
          data-testid="food-bottom-btn"
          src={ MealIcon }
          alt="comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
