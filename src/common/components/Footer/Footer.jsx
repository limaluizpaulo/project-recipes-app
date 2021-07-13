import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../../images/drinkIcon.svg';
import exploreIcon from '../../../images/exploreIcon.svg';
import mealIcon from '../../../images/mealIcon.svg';
import './footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img
          type="image"
          title="Drinks"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          type="image"
          title="Explorar"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          type="image"
          title="Comidas"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="comidas"
        />
      </Link>
    </footer>
  );
}
