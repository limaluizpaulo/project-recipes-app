import React from 'react';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './components.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer-body">
      <a href="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink icon" />
      </a>
      <a href="/explorar">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore icon" />
      </a>
      <a href="/comidas">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal icon" />
      </a>
    </div>
  );
}

export default Footer;
