import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import ContextRecipes from '../context/contextRecipes';

import '../App.css';
import './footer.css';
// import ContextRecipes from '../context/contextRecipes';

function Footer({ history }) {
  // const { setTitle } = useContext(ContextRecipes);
  const goDrinks = () => {
    history.push('/bebidas');
    // setTitle('Bebidas');
  };
  const goExplore = () => {
    history.push('/explore');
    // setTitle('Explore');
  };
  const goFood = () => {
    history.push('/comidas');
    // setTitle('Comidas');
  };

  return (
    <footer data-testid="footer" className="footer-container">
      <button
        name="Bebidas"
        className="normal-button"
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ goDrinks }
      >
        <img src={ drinkIcon } alt="Drinks Icon" />
      </button>
      <button
        className="normal-button"
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ goExplore }
      >
        <img src={ exploreIcon } alt="Explore Icon" />
      </button>
      <button
        className="normal-button"
        type="button"
        data-testid="food-bottom-btn"
        onClick={ goFood }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Footer;
