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
    history.push('/explorar');
    // setTitle('Explore');
  };
  const goFood = () => {
    history.push('/comidas');
    // setTitle('Comidas');
  };

  return (
    <footer data-testid="footer" className="footer-container">
      <input
        name="Bebidas"
        className="normal-button"
        type="image"
        data-testid="drinks-bottom-btn"
        onClick={ goDrinks }
        src={ drinkIcon }
        alt="Drinks Icon"
        width="45"
      />
      <input
        className="normal-button"
        type="image"
        data-testid="explore-bottom-btn"
        onClick={ goExplore }
        src={ exploreIcon }
        alt="Explore Icon"
        width="45"
      />
      <input
        className="normal-button"
        type="image"
        data-testid="food-bottom-btn"
        onClick={ goFood }
        src={ mealIcon }
        alt="Meal Icon"
      />
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Footer;
