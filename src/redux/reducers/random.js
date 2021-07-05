import { RANDOM } from '../actions/index';

const initialState = {
  list: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case RANDOM:
    return {
      ...state,
      list: payload,
    };

  default:
    return state;
  }
};
