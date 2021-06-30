import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button" data-testid="drinks-bottom-btn">drinks</button>
      </Link>
      <Link to="/explorar">
        <button type="button" data-testid="explore-bottom-btn">explorar</button>
      </Link>
      <Link to="/comidas">
        <button type="button" data-testid="food-bottom-btn">comidas</button>
      </Link>
    </footer>
  );
}

export default Footer;
