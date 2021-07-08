import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

import { Instructions } from '../styles/Details';

export default function InstructionsDetails() {
  const { drinkDetails } = useContext(DrinksContext);
  const { foodDetails } = useContext(RecipesContext);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;
  return getDrinksDetails ? (
    <Instructions>
      <h1>Instructions</h1>
      <div>
        <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      </div>
    </Instructions>
  ) : (
    <Instructions>
      <h1>Instructions</h1>
      <div>
        <p data-testid="instructions">{foodDetails.strInstructions}</p>
      </div>
    </Instructions>
  );
}
