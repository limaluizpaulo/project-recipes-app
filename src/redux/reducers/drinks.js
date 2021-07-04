import { DRINKS } from '../actions/index';

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

  default:
    return state;
  }
};
