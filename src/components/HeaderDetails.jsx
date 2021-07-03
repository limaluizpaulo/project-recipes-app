import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import DrinksContext from '../context/DrinksContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function HeaderDetails() {
  const [data, setData] = useState('');
  const { drinkDetail } = useContext(DrinksContext);
  const NUMBER_TO_VERIFICATION = -1;
  const { pathname } = useLocation();
  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  if (getDrinksDetails) {
    setData(drinkDetail);
  }

  return (
    <header>
      <img
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <section>
        <div className="Title-and-Category">
          <span data-testid="recipe-title">{ data.strDrink}</span>
          <span data-testid="recipe-category">{ data.strAlcoholic }</span>
        </div>
        <div className="Like-and-Share">
          <button type="button">
            <img src={ shareIcon } alt="Icon Share" />
          </button>
          <button type="button">
            <img src={ whiteHeartIcon } alt="Icon Like" />
          </button>
        </div>
      </section>
    </header>
  );
}

export default HeaderDetails;
