import { RECIPESDETAILS } from '../actions/index';

const initialState = {
  item: [],
  shouldRedirect: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case RECIPESDETAILS:
    return {
      item: payload,
      shouldRedirect: true,
    };

  default:
    return state;
  }
};
