import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="bottom-menu" data-testid="footer">
      <Link to="/bebidas">
        <img
          alt="drinks buttom"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          alt="search buttom"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          alt="meal buttom"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
