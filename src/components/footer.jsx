import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../css/footer.css';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer data-testid="footer" className="footer">
          <Link to="/bebidas">
            <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
          </Link>
          <Link to="/explorar">
            <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" />
          </Link>
          <Link to="/comidas">
            <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" />
          </Link>
        </footer>
      </div>
    );
  }
}

export default Footer;
