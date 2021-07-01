import React from 'react';
import { Link } from 'react-router-dom';

import drinkImage from '../images/drinkIcon.svg';
import exploreImage from '../images/exploreIcon.svg';
import mealImage from '../images/mealIcon.svg';

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (

      <footer data-testid="footer" className="footer">
        <Link to="/bebidas">
          <button
            type="button"
            data-testid="drinks-bottom-btn"
            src={ drinkImage }
          >
            <img src={ drinkImage } alt="drinks" />
          </button>
        </Link>

        <Link to="/explorar">
          <button
            type="button"
            data-testid="explore-bottom-btn"
            src={ exploreImage }
          >
            <img src={ exploreImage } alt="explore" />
          </button>
        </Link>

        <Link to="/comidas">
          <button
            type="button"
            data-testid="food-bottom-btn"
            src={ mealImage }
          >
            <img src={ mealImage } alt="food" />
          </button>
        </Link>

      </footer>

    );
  }
}

export default Footer;
