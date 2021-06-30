import React from 'react';
import { Link } from 'react-router-dom';

import drinkImg from './images/drinkIcon.svg';
import exploreImg from './images/exploreIcon.svg';
import mealImg from './images/mealIcon.svg';

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
              <img src={ drinkImg } alt="drinks" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/explorar">
            <button
              type="button"
              data-testid="explore-bottom-btn"
            >
              <img src={ exploreImg } alt="explore" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/comidas">
            <button
              type="button"
              data-testid="food-bottom-btn"
            >
              <img src={ mealImg } alt="food" />
            </button>
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
