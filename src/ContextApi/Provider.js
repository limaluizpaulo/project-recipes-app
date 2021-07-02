import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

import RequestByArea from '../RequisiçõesAPI/food/RequestByArea';
import RequestByCategory from '../RequisiçõesAPI/food/RequestByCategory';
import RequestByIngredients from '../RequisiçõesAPI/food/RequestByIngredients';

import RequestDrinkImg from '../RequisiçõesAPI/drink/RequestDrinkImg';

import Teste from '../RequisiçõesAPI/teste';
import RequestRandomDrink from '../RequisiçõesAPI/drink/RequestRandomDrink';

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
