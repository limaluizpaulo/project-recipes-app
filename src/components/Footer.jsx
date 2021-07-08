import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  return (
    <footer data-testid="footer" style={ bottomFixed }>
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <img src={ drinkIcon } alt="drinks-icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/explorar') }>
        <img src={ exploreIcon } alt="explore-icon" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/comidas') }>
        <img src={ mealIcon } alt="food-icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
