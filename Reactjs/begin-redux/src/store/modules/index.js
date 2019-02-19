import { combineReducers } from 'redux';
import counter from './counter';
import todo from './todo';
import post from './post';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  counter,
  todo,
  post,
  pender: penderReducer
})