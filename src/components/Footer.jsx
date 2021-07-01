import React from 'react';
import './css/footer.css';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        type="button"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          src={ drinkIcon }
          alt="drinks-icon"
        />
      </button>
      <button
        type="button"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="explore-icon"
        />
      </button>
      <button
        type="button"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
      >
        <img
          src={ mealIcon }
          alt="food-icon"
        />
      </button>
    </footer>
  );
}
