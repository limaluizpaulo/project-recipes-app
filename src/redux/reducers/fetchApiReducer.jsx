import FETCH_API from '../actions/actionTypes';

const INITIAL_STATE = {
  resultAPI: {
    drinks: [],
    meals: [],
  },
};

function fetchApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      resultAPI: {
        ...state.resultAPI,
        ...action.payload,
      },
    };
  default:
    return state;
  }
}

export default fetchApiReducer;
