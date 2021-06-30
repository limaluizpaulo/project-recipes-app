import React from 'react';
import { Link } from 'react-router-dom';

import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <img src={ DrinkIcon } alt="drinks" />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          data-testid="explore-bottom-btn"
        >
          <img src={ ExploreIcon } alt="explorar" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
        >
          <img src={ MealIcon } alt="comidas" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
