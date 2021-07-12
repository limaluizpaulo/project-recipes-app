import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

export default function DecentFooter() {
  return (
    <footer>
      <div className="decent-footer">
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="drink icon" />
        </Link>
        <Link to="/explorar">
          <img src={ exploreIcon } alt="explore icon" />
        </Link>
        <Link to="/comidas">
          <img src={ mealIcon } alt="meal icon" />
        </Link>
        <Link to="/">
          <ExitButton />
        </Link>
      </div>
    </footer>
  );
}
