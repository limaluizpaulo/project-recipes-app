import React from 'react';
import { useHistory } from 'react-router-dom';

import mealIncon from '../svg/mealIcon.svg';
import exploreIncon from '../svg/exploreIcon.svg';
import drinkIncon from '../svg/drinkIcon.svg';
import './Footer.css';

function Footer() {
  const { push } = useHistory();

  return (
    <footer>
      <button
        type="button"
        className="svg-button"
        onClick={ () => push('/comidas') }
      >
        <img className="svg-med" src={ mealIncon } alt="Meals Icon" />
      </button>
      <button
        type="button"
        className="svg-button relative"
        onClick={ () => push('/explorar') }
      >
        <img className="svg-large" src={ exploreIncon } alt="Explore Icon" />
      </button>
      <button
        type="button"
        className="svg-button"
        onClick={ () => push('/bebidas') }
      >
        <img className="svg-med" src={ drinkIncon } alt="Drinks Icon" />
      </button>
      <div className="bottom-circle" />
    </footer>
  );
}

export default Footer;
