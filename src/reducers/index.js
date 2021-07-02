import { combineReducers } from 'redux';
import user from './user';
import recipes from './recipes';

const listReducer = combineReducers({ user, recipes });

export default listReducer;
