import { combineReducers } from 'redux';
import counter from './counter';
import todo from './todo';
import post from './post';

export default combineReducers({
  counter,
  todo,
  post
})