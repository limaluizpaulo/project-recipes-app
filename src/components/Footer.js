import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// images
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

// css
import './style/Footer.css';

// data
import { allowedFooterPathRender } from '../data/pathLocationNames';

function Footer() {
  const location = useLocation();

  const renderContent = () => (
    <footer data-testid="footer">
      {/* TODO: Remove to="comidas" */}
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Drink Icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="Explore Icon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="Meal Icon" />
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

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return verifyAllowance();
}

export default Footer;
