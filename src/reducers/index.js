import { combineReducers } from 'redux';
import user from './user';
import done from './done';

const listReducer = combineReducers({ user, done });

export default listReducer;
