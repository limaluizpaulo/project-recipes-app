import { combineReducers } from 'redux';
import user from './user';

const listReducer = combineReducers({ user });

export default listReducer;
