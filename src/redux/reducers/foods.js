import { FOODS, RANDOM, FOOD_CATEGORIES, FOODSAREA } from '../actions/index';

// const udate = function () {
//   console.log(this.list);
// };
const initialState = {
  list: [],
  areaSelect: [],
  goToFoodsPage: false,
  categories: [],
  shouldRedirect: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case FOODS:
    return {
      ...state,
      list: payload || [],
      goToFoodsPage: payload && payload.length === 1,

    };
  case RANDOM:
    return {
      ...state,
      list: payload,
      shouldRedirect: true,
    };

  case FOODSAREA:
    return {
      ...state,
      areaSelect: payload || [],
      shouldRedirect: true,
    };

  case FOOD_CATEGORIES:
    return {
      ...state,
      categories: payload,
    };

  default:
    return state;
  }
};
