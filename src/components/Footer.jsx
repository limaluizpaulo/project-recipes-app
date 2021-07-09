import React from 'react';
import { Link } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import exploreImage from '../images/exploreIcon.svg';
import mealImage from '../images/mealIcon.svg';
import '../css/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkImage }
            alt="drinks"
          />
        </Link>
        <Link to="/explorar">
          <img
            type="button"
            data-testid="explore-bottom-btn"
            src={ exploreImage }
            alt="explore"
          />
        </Link>
        <Link to="/comidas">
          <img
            type="button"
            data-testid="food-bottom-btn"
            src={ mealImage }
            alt="food"
          />
        </Link>
      </footer>
    );
  }
}

export default Footer;
