import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
    </footer>
  );
}

export default Footer;
