import React from 'react';
import { useHistory } from 'react-router-dom';

import mealIncon from '../svg/mealIcon.svg';
import exploreIncon from '../svg/exploreIcon.svg';
import drinkIncon from '../svg/drinkIcon.svg';
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
          className="svg-med"
          src={ mealIncon }
          alt="Meals Icon"
          data-testid="food-bottom-btn"
        />
      </button>
      <div className="button-explore-container">
        <button
          type="button"
          className="button-svg"
          onClick={ () => push('/explorar') }
        >
          <img
            className="svg-large"
            src={ exploreIncon }
            alt="Explore Icon"
            data-testid="explore-bottom-btn"
          />
        </button>
      </div>
      <button
        type="button"
        className="button-svg"
        onClick={ () => push('/bebidas') }
      >
        <img
          className="svg-med"
          src={ drinkIncon }
          alt="Drinks Icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
