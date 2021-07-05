import { createStore } from 'redux';
import rootReducer from '../reducers';

// const extension = window.devToolsExtension() || ((f) => f);

const store = createStore(rootReducer);

export default store;
