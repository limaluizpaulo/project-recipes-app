import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const divStyle = {
    position: 'fixed',
    bottom: '0px',
  };
  return (
    <div style={ divStyle } data-testid="footer">
      <a
        href="/bebidas"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </a>
      <a
        href="/explorar"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="drink icon" />
      </a>
      <a
        href="/comidas"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="drink icon" />
      </a>
    </div>
  );
}

export default Footer;
