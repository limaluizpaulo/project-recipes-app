import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const { setPreviousIsExploreIngredients } = useContext(RecipeContext);

  function handleOnClick() {
    setPreviousIsExploreIngredients(false);
  }
  return (
    <div className="footerContainer" data-testid="footer">
      <Link to="/bebidas">
        <button type="button" className="none-button" onClick={ handleOnClick }>
          <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" className="none-button" onClick={ handleOnClick }>
          <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas" className="test2">
        <div className="test">
          <button type="button" className="none-button" onClick={ handleOnClick }>
            <img src={ mealIcon } alt="Meals" data-testid="food-bottom-btn" />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Footer;
