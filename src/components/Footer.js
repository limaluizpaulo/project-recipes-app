import React from 'react';
import { Link } from 'react-router-dom';

// images
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      {/* TODO: Remove to="comidas" */}
      <Link to="/comidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Drink Icon" />
      </Link>
      <Link to="/comidas" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="Explore Icon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="Meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
