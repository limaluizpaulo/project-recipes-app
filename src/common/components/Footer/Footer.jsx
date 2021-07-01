import React from 'react';
import { Redirect } from 'react-router-dom';
import drinkIcon from '../../../images/drinkIcon.svg';
import exploreIcon from '../../../images/exploreIcon.svg';
import mealIcon from '../../../images/mealIcon.svg';
import './footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="bebidas"
        onClick={ () => <Redirect to="/bebidas" /> }
      />
      <input
        type="image"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="explorar"
        onClick={ () => <Redirect to="/explorar" /> }
      />
      <input
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="comidas"
        onClick={ () => <Redirect to="/comidas" /> }
      />

    </footer>
  );
}
