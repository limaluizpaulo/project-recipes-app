import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

export default function Footer() {
  return (
    <footer className="footer-generic " data-testid="footer">
      <div className="footer-icons">
        <Link to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
        </Link>
        <Link to="/explorar">
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
        </Link>
        <Link to="/comidas">
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal icon" />
        </Link>
        <Link to="/">
          <ExitButton />
        </Link>
      </div>
    </footer>
  );
}
