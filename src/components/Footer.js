import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIncon from '../images/drinkIcon.svg';
import exploreIncon from '../images/exploreIcon.svg';
import mealIncon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button onClick={ () => history.push('/bebidas') } type="button">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIncon }
          alt="Drinks Icon"
        />
      </button>
      <button onClick={ () => history.push('/explorar') } type="button">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIncon }
          alt="Explore Icon"
        />
      </button>
      <button onClick={ () => history.push('/comidas') } type="button">
        <img data-testid="food-bottom-btn" src={ mealIncon } alt="Foods Icon" />
      </button>
    </footer>
  );
}

export default Footer;
