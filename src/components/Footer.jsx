import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <button data-testid="drinks-bottom-btn" type="button">Drinks</button>
    </Link>
    <Link to="/comidas">
      <button data-testid="food-bottom-btn" type="button">Foods</button>
    </Link>
    <Link to="/perfil">
      <button data-testid="explore-bottom-btn" type="button">Explore</button>
    </Link>
  </footer>
);

export default Footer;
