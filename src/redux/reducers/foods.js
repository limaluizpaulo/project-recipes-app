import { FOODS } from '../actions/index';

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

  default:
    return state;
  }
};
