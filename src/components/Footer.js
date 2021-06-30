import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './style/Footer.css';

import { allowedFooterPathRender } from '../data/pathLocationNames';

function Footer() {
  const location = useLocation();

  const renderContent = () => (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );

  const verifyAllowance = () => {
    let isAllowed = false;
    allowedFooterPathRender.some((element) => {
      if (location.pathname === element) {
        isAllowed = true;
        return true; // stops "some" func.
      }
      return false;
    });

    if (isAllowed) return renderContent();

    return null;
  };

  return verifyAllowance();
}

export default Footer;
