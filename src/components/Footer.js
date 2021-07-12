import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="ícone do link para bebidas" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img src={ exploreIcon } alt="ícone do link para explorar" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="ícone do link para comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
