import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <div className="footer-icons">
        <a href="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
        </a>
        <a href="/explorar">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
        </a>
        <a href="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
        </a>
      </div>
    </footer>
  );
}
