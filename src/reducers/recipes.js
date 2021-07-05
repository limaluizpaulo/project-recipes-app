const INTIAL_STATE = {
  recipes: [],
  inputIngredientes: '',
};

const recipes = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_RECIPES':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_INGREDIENTS':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_NAME':
    return { ...state, recipes: action.payload.data };
  case 'RECIPES_FIRST_LETTER':
    return { ...state, recipes: action.payload.data };
  case 'SAVE_INPUT_INGREDIENTES':
    return { ...state, recipes: action.payload.input };
  default:
    return state;
  }
};

export default recipes;
