import { combineReducers } from 'redux';
import user from './user';
import done from './done';
import recipes from './recipes';

const listReducer = combineReducers({ user, recipes, done });
export default listReducer;
