import FETCH_API from '../actions/actionTypes';

const ADD_INGREDIENT = 'ADD_INGREDIENT';
// const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

const INITIAL_STATE = {
  resultAPI: {
    drinks: [],
    meals: [],
    nameIngredient: null,
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
  case ADD_INGREDIENT:
    return {
      ...state,
      resultAPI: {
        ...state.resultAPI,
        nameIngredient: action.payload,
      },
    };
  default:
    return state;
  }
}

export default fetchApiReducer;
