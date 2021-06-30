import { createStore } from 'redux';
import rootReducers from '../reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

