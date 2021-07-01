import { ADD_LOGIN } from '../store';

const userReducer = (state, { type, payload }) => { // Desestruturação do Action
  switch (type) {
  case ADD_LOGIN: {
    const { name, value } = payload;
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
