import { DRINKS, DRINK_CATEGORIES } from '../actions/index';

const initialState = {
  list: [],
  goToDrinksPage: false,
  drinkNotFound: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case DRINKS:
    return {
      ...state,
      list: payload,
      goToDrinksPage: payload && payload.length === 1,
      drinkNotFound: !payload,
    };
  case DRINK_CATEGORIES:
    return {
      ...state,
      list: payload,
    };

  default:
    return state;
  }
};
