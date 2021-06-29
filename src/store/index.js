import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import listReducer from '../reducers';

const store = createStore(
  listReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
