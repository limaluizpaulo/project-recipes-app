import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer(props) {
  const { className } = props;
  return (
    <footer
      className={ `footer ${className}` }
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="Martini glass" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="Compass" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="knife and fork" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

Footer.propTypes = { className: PropTypes.string.isRequired };
