import { ADD_LOGIN } from '../store';

const userReducer = (state, action) => {
  switch (action.type) {
  case ADD_LOGIN: {
    const { payload: { email, password } } = action;
    return {
      ...state,
      email,
      password,
    };
  }
  default:
    return state;
  }
};

export default userReducer;
