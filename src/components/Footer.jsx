import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button">
          <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
        </button>
      </Link>

      <Link to="/explorar">
        <button type="button">
          <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
        </button>
      </Link>

      <Link to="/comidas">
        <button type="button">
          <img src={ mealIcon } alt="Meal" data-testid="food-bottom-btn" />
        </button>
      </Link>

    </footer>
  );
}

export default Footer;
