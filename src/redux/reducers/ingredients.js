import { INGREDIENTS } from '../actions/index';

const initialState = {
  list: [],
  shouldRedirect: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case INGREDIENTS:
    return {
      ...state,
      list: payload,
      shouldRedirect: true,
    };

  default:
    return state;
  }
};
