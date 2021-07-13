import React from 'react';
import { Link } from 'react-router-dom';
import { GiMartini, GiKnifeFork } from 'react-icons/gi';
import { FiCompass } from 'react-icons/fi';
import './css/footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button">
          <GiMartini />
        </button>
      </Link>

      <Link to="/explorar">
        <button type="button">
          <FiCompass />
        </button>
      </Link>

      <Link to="/comidas">
        <button type="button">
          <GiKnifeFork />
        </button>
      </Link>

    </footer>
  );
}

export default Footer;
