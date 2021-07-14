// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import drinkReducer from '../reducers/drinkReducer';
// import { fetchDrinkAction } from '../actions';

describe('testa o drinkReducer', () => {
  it('testa o estado inicial do reducer', () => {
    expect(drinkReducer(undefined, {})).toEqual(
      {
        recipes: [],
        categories: [],
        drinkById: [],
        ingredients: [],
      },
    );
  });

  // it('testa se o array recipes é preenchido', () => {
  //   const previousState = {
  //     recipes: [],
  //     categories: [],
  //     drinkById: [],
  //     ingredients: [],
  //   };

  //   expect(drinkReducer(previousState, fetchDrinkAction())).toEqual(
  //     {
  //       recipes: [],
  //       categories: [],
  //       drinkById: [],
  //       ingredients: [],
  //     },
  //   );
  // });
});
