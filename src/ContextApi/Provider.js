import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

import RequestByArea from '../RequisicoesAPI/food/RequestByArea';
import RequestByCategory from '../RequisicoesAPI/food/RequestByCategory';
import RequestByIngredients from '../RequisicoesAPI/food/RequestByIngredients';

import RequestDrinkImg from '../RequisicoesAPI/drink/RequestDrinkImg';

import Teste from '../RequisicoesAPI/teste';
import RequestRandomDrink from '../RequisicoesAPI/drink/RequestRandomDrink';

const initialState = {
  filters: {
    filterName: '',
  },
  apis: {
    food: {
      category: [],
      area: [],
      ingredients: [],
    },
    drink: {
      drinkImg: [],
      randomDrink: [],
    },
  },
};

function AuthProvider({ children }) {
  const categoryApiReturn = RequestByCategory();
  const areaApiReturn = RequestByArea();
  const ingredientsApiReturn = RequestByIngredients();

  Teste();

  const drinkImgApiReturn = RequestDrinkImg();
  const randomDrinkApiReturn = RequestRandomDrink();

  const [state, setstate] = useState(initialState);

  useEffect(() => {
    setstate({
      ...state,
      apis: {
        ...state.apis,
        food: {
          ...state.apis.food,
          category: categoryApiReturn,
          area: areaApiReturn,
          ingredients: ingredientsApiReturn,
        },
        drink: {
          ...state.apis.drink,
          drinkImg: drinkImgApiReturn,
          randomDrink: randomDrinkApiReturn,
        },
      },
    });
  }, []);

  const listOfContext = {
    state,
    setstate,
  };

  console.log(state);

  return (
    <AppContext.Provider value={ { listOfContext } }>
      { children }
    </AppContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
