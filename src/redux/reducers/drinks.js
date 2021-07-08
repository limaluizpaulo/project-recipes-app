import { DRINKS, DRINK_CATEGORIES, RANDOM } from '../actions/index';

const initialState = {
  list: [],
  goToDrinksPage: false,
  categories: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case DRINKS:
    return {
      ...state,
      list: payload || [],
      goToDrinksPage: payload && payload.length === 1,
      // drinkNotFound: !payload,
    };
  case RANDOM:
    return {
      ...state,
      list: payload,
      shouldRedirect: true,
    };

  case DRINK_CATEGORIES:
    return {
      ...state,
      categories: payload,
    };

  default:
    return state;
  }
};
