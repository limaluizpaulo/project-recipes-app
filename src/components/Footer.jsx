import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import ContextRecipes from '../context/contextRecipes';

import '../App.css';

// import ContextRecipes from '../context/contextRecipes';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
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

// Footer.propTypes = {
//   history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
// };

export default Footer;
