const INITIAL_STATE = {};

const progressRecipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'progress':
    return {
      recipe: action.payload,
    };
  default:
    return state;
  }
};

export default progressRecipe;
