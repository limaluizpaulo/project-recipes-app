import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import drinkIcon from '../../../images/drinkIcon.svg';
import exploreIcon from '../../../images/exploreIcon.svg';
import mealIcon from '../../../images/mealIcon.svg';
import './footer.css';

export default function Footer() {
  const [whatPath, setWhatPath] = useState('');

  if (whatPath) return <Redirect to={ `/${whatPath}` } />;

  return (
    <footer data-testid="footer">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="bebidas"
        onClick={ () => setWhatPath('bebidas') }
      />
      <input
        type="image"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="explorar"
        onClick={ () => setWhatPath('explorar') }
      />
      <input
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="comidas"
        onClick={ () => setWhatPath('comidas') }
      />
    </footer>
  );
}
