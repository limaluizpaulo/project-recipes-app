import React from 'react';
import { Link } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { BsCompass } from 'react-icons/bs';
// import drinkIcon from '../images/drinkIcon.svg';
// import exploreIcon from '../images/exploreIcon.svg';
// import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <section className="section-footer">
      <div
        data-testid="footer"
        // className="navbar fixed-bottom"
        className="footer"
        style={ { background: '#C4C4C4' } }
      >
        <Link to="/bebidas">
          <BiDrink className="drink-icon-footer" />
          {/* <img alt="Bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon } /> */}
        </Link>
        <Link to="/explorar">
          <BsCompass className="explore-icon-footer" />
          {/* <img
            alt="Explorar"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
          /> */}
        </Link>
        <Link to="/comidas">
          <GiHotMeal className="meal-icon-footer" />
          {/* <img alt="Comidas" data-testid="food-bottom-btn" src={ mealIcon } /> */}
        </Link>
      </div>
    </section>
  );
}

export default Footer;
