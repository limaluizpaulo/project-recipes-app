import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      {/* TODO: Remove to="comidas" */}
      <Link to="/comidas" data-testid="drinks-bottom-btn"> drinks </Link>
      <Link to="/comidas" data-testid="explore-bottom-btn"> explore </Link>
      <Link to="/comidas" data-testid="food-bottom-btn"> food </Link>
    </footer>
  );
}

export default Footer;
