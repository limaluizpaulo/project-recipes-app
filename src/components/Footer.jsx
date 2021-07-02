import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer" className="footer">
    <Link to="/bebidas">
      <button type="button">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="icone de bebidas" />
      </button>
    </Link>
    <Link to="/comidas">
      <button type="button">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="icone de comidas" />
      </button>
    </Link>
    <Link to="/explorar">
      <button type="button">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="icone de exploração"
        />
      </button>
    </Link>
  </footer>
);

export default Footer;
