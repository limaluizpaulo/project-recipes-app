import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const { setResults } = useContext(Context);
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="ícone do link para bebidas" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img src={ exploreIcon } alt="ícone do link para explorar" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="ícone do link para comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
