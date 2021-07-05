import {
  CARD_CONTENT,
} from '../actions/saveCardsContent';

const INITIAL_STATE = {
  content: [],
};

const saveContentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CARD_CONTENT:
    return ({
      ...state,
      content: action.content,
    });
  default:
    return state;
  }
};

export default saveContentReducer;
