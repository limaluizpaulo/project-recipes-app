import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

const Footer = () => (
  <footer data-testid="footer" className="footer">
    <Link
      to="/bebidas"
    >
      <img
        src={ drinkIcon }
        alt="logo-drink"
        data-testid="drinks-bottom-btn"
      />
    </Link>
    <Link
      to="/explorar"
    >
      <img
        alt="logo-explorer"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link
      to="/comidas"
    >
      <img
        src={ mealIcon }
        alt="logo-meal"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);
export default Footer;
