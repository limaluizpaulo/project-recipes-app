import { combineReducers } from 'redux';
import drinkReducer from './drinkReducer';
import foodReducer from './foodReducer';

const rootReducers = combineReducers({
  food: foodReducer,
  drink: drinkReducer,
});

export default rootReducers;
