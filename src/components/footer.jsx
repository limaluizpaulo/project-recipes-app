import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../css/footer.css';

class Footer extends Component {
  render() {
    return (
      <section className="footer-main">
        <footer data-testid="footer" className="footer">
          <Link to="/bebidas">
            <div className="footer-btn">
              <img
                className="footer-icon"
                src={ drinkIcon }
                alt="drink icon"
                data-testid="drinks-bottom-btn"
              />
              <span className="footer-span">Bebidas</span>
            </div>
          </Link>
          <Link className="footer-btn" to="/explorar">
            <div className="btn-explorer">
              <img
                className="footer-icon"
                src={ exploreIcon }
                alt="explorar"
                data-testid="explore-bottom-btn"
              />
            </div>
            <span className="footer-span footer-span-explorer">Explorar</span>
          </Link>
          <Link to="/comidas">
            <div className="footer-btn">
              <img
                className="footer-icon"
                src={ mealIcon }
                alt="comidas"
                data-testid="food-bottom-btn"
              />
              <span className="footer-span">Comidas</span>
            </div>
          </Link>
        </footer>
      </section>
    );
  }
}

export default Footer;
