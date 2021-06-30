import { combineReducers } from 'redux';
import foodReducer from './foodReducer';

const rootReducers = combineReducers({
  food: foodReducer,
});

export default rootReducers;
