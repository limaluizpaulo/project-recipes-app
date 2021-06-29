const INTIAL_STATE = {};

const recipes = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'xxx':
    return { ...state };
  default:
    return state;
  }
};

export default recipes;
