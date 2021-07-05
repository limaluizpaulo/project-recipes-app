import { USERLOGIN } from '../redux/actions';

const initialState = {
  email: '',
  password: '',

};

export default (state = initialState, { type }) => {
  switch (type) {
  case USERLOGIN:
    return state;

  default:
    return state;
  }
};
