import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer data-testid="footer" className="footer">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explorar" />
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
        </footer>
      </div>
    );
  }
}

export default Footer;
