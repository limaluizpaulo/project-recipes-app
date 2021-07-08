import { AREA } from '../actions';

const INITAL_STATE = {
  areaNames: [],
};

const mealsArea = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case AREA:
    return {
      areaNames: action.areas,
    };
  default:
    return state;
  }
};

export default mealsArea;
