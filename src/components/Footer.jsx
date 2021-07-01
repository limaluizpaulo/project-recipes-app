import React from 'react';

import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="icone de bebida"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="icone de explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="icone de comida"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
