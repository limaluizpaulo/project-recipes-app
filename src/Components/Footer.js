import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

class Footer extends React.Component {
  render() {
    const bebidas = 'bebidas';
    const comidas = 'comidas';

    return (
      <footer className="footer" data-testid="footer">
        <Link to={ `/${bebidas}` }>
          <img
            src={ drinkIcon }
            alt="drinkIcone"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="explorarIcon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to={ `/${comidas}` }>
          <img
            src={ mealIcon }
            alt="mealtIcon"
            data-testid="food-bottom-btn"
          />
        </Link>
      </footer>
    );
  }
}

export default Footer;
