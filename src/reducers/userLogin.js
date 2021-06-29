import { USER_EMAIL } from '../action';

const INITIAL_STATE = {
  email: '',
};

const userLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userLogin;
