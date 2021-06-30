import { FOODS } from '../actions/index';

export default (state = {}, { type, payload }) => {
  switch (type) {
  case FOODS:
    return {
      ...state, meals: payload,
    };

  default:
    return state;
  }
};
