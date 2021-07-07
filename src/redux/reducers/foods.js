import { FOODS, RANDOM, FOOD_CATEGORIES } from '../actions/index';

const initialState = {
  list: [],
  goToFoodsPage: false,

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case FOODS:
    return {
      ...state,
      list: payload,
      goToFoodsPage: payload && payload.length === 1,

    };
  case RANDOM:
    return {
      ...state,
      list: payload,
      shouldRedirect: true,
    };

  case FOOD_CATEGORIES:
    return {
      ...state,
      list: payload,
    };

  default:
    return state;
  }
};
