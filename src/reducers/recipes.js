const INTIAL_STATE = {};

const recipes = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_RECIPES':
    return { ...state, recipes: action.payload.data };
  default:
    return state;
  }
};

export default recipes;
