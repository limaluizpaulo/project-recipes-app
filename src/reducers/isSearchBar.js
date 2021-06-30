import { IS_SEARCHBAR } from '../action';

const INITIAL_STATE = {
  searchBarOn: true,
};

const isSearchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_SEARCHBAR:
    return {
      ...state,
      searchBarOn: action.searchBarOn,
    };
  default:
    return state;
  }
};

export default isSearchBar;
