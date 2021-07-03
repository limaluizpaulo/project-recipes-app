import React from 'react';
import { useHistory } from 'react-router-dom';

import mealIncon from '../images/mealIcon.svg';
import exploreIncon from '../images/exploreIcon.svg';
import drinkIncon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  const { push } = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        className="button-svg"
        onClick={ () => push('/comidas') }
      >
        <img
          src={ mealIncon }
          alt="Meals Icon"
          data-testid="food-bottom-btn"
        />
      </button>

      <button
        type="button"
        className="button-svg"
        onClick={ () => push('/explorar') }
      >
        <img
          src={ exploreIncon }
          alt="Explore Icon"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        className="button-svg"
        onClick={ () => push('/bebidas') }
      >
        <img
          src={ drinkIncon }
          alt="Drinks Icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
