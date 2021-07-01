import { DRINKS } from '../actions/index';

export default (state = { list: [] }, { type, payload }) => {
  switch (type) {
  case DRINKS:
    return {
      ...state, list: payload,
    };

  default:
    return state;
  }
};
