import React from 'react';
import { Link } from 'react-router-dom';

import drinkImage from './images/drinkIcon.svg';
import exploreImage from './images/exploreIcon.svg';
import mealImage from './images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer">
        <div>
          <Link to="/bebidas">
            <button
              type="button"
              data-testid="drinks-bottom-btn"
            >
              <img src={ drinkImage } alt="drinks" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/explorar">
            <button
              type="button"
              data-testid="explore-bottom-btn"
            >
              <img src={ exploreImage } alt="explore" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/comidas">
            <button
              type="button"
              data-testid="food-bottom-btn"
            >
              <img src={ mealImage } alt="food" />
            </button>
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
