const INTIAL_STATE = {
  drinks: [],
  byCategories: [],
};

const drinks = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_DRINKS':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_INGREDIENTS':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_NAME':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_FIRST_LETTER':
    return { ...state, drinks: action.payload.data };
  case 'DRINKS_CATEGORY':
    return { ...state, byCategories: action.payload.data };
  default:
    return state;
  }
};

export default drinks;
