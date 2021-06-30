import React from 'react';
import { Link } from 'react-router-dom';
// import { drink } from '../images';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas">
        <a data-testid="drinks-bottom-btn" src="../images/drinkIcon.svg" to="/drinks">
          Drinks
        </a>
      </Link>
      <Link to="/explorar">
        <a data-testid="explore-bottom-btn" src="../images/exploreIcon.svg" to="/explore">
          Explore
        </a>
      </Link>
      <Link to="/comidas">
        <a data-testid="food-bottom-btn" src="../images/mealIcon.svg" to="/food">
          Food
        </a>
      </Link>
    </div>
  );
}

export default Footer;
