import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import ReduxThunk from 'redux-thunk';
import penderMiddleware from 'redux-pender';
import promiseMiddleware from 'redux-promise-middleware';

const configure = () => {
  // const store = createStore(modules);
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(modules, devTools, applyMiddleware(ReduxThunk, penderMiddleware()));

  return store;
}

export default configure;
