const INTIAL_STATE = {};

const drinks = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_DRINKS':
    return { ...state, drinks: action.payload.data };
  default:
    return state;
  }
};

export default drinks;
