import { SAVE_USER } from '../actions/types';

const INTIAL_STATE = {};

const user = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return { ...state };
  default:
    return state;
  }
};

export default user;
