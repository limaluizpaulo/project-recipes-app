import { AREA } from '../action/index';

const INITIAL_STATE = {
  country: [],
};
const foodArea = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AREA:
    return {
      ...state,
      country: action.AreaDetails,
    };

  default:
    return state;
  }
};
export default foodArea;
