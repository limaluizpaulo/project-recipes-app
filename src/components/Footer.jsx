import React from 'react';
import { useHistory } from 'react-router';

import '../styles/Footer.css';

import Drink from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import teste from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function redirectToRespectivelyPages(event) {
    const { name } = event.target;
    history.push(`/${name}`);
  }

  return (
    <footer data-testid="footer">
      <div className="footer">

        <button
          type="button"
          onClick={ (event) => redirectToRespectivelyPages(event) }
          name="bebidas"
        >
          <img
            src={ Drink }
            alt="drink"
            name="bebidas"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          type="button"
          onClick={ (event) => redirectToRespectivelyPages(event) }
          name="explorar"
        >
          <img
            src={ Explore }
            alt="explore"
            name="explorar"
            data-testid="explore-bottom-btn"
          />
        </button>
        <button
          type="button"
          onClick={ (event) => redirectToRespectivelyPages(event) }
          name="comidas"
        >
          <img
            src={ teste }
            alt="food"
            name="comidas"
            data-testid="food-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
