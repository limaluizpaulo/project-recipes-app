import { combineReducers } from 'redux';
import fetchApiReducer from './fetchApiReducer';

const rootReducers = combineReducers({
  data: fetchApiReducer,
});

export default rootReducers;
