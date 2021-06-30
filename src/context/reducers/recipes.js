import { ADD_RECIPES } from '../store';

const recipesReducer = (state, action) => {
  switch (action.type) {
  case ADD_RECIPES: {
    const { payload: { meals, drinks } } = action;
    return {
      ...state,
      meals,
      drinks,
    };
  }
  default:
    return state;
  }
};

export default recipesReducer;
