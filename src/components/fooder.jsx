import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Fooder extends Component {
  render() {
    return (
      <section>
        <fooder data-testid="footer">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explorar" />
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
        </fooder>
      </section>
    );
  }
}

export default Fooder;
