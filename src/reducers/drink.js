const INTIAL_STATE = {};

const drinks = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case 'xxx':
    return { ...state };
  default:
    return state;
  }
};

export default drinks;
