import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Style/DownMenu.css';

class DownMenu extends Component {
  render() {
    return (
      <footer data-testid="footer">
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>

        <Link to="/explorar">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </Link>

        <Link to="/comidas">
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </Link>
      </footer>
    );
  }
}

export default DownMenu;
