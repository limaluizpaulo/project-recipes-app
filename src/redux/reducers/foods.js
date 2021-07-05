import { FOODS, RANDOM } from '../actions/index';

const initialState = {
  list: [],
  goToFoodsPage: false,
  foodNotFound: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case FOODS:
    return {
      ...state,
      list: payload,
      goToFoodsPage: payload && payload.length === 1,
      foodNotFound: !payload,
    };
  case RANDOM:
    return {
      ...state,
      list: payload,
      shouldRedirect: true,
    };

  default:
    return state;
  }
};
