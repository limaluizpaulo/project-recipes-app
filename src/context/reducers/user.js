import { ADD_LOGIN } from '../store';

const userReducer = (state, action) => {
  switch (action.type) {
  case ADD_LOGIN: {
    const { payload: { name, value } } = action;
    return {
      ...state,
      [name]: value,
    };
  }
  default:
    return state;
  }
};

export default userReducer;
