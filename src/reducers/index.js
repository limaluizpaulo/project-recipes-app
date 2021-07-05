import { combineReducers } from 'redux';
import user from './user';
import done from './done';
import recipes from './recipes';
import saveCardsContent from './cardsContent';

const listReducer = combineReducers({ user, done, recipes, saveCardsContent });
export default listReducer;
