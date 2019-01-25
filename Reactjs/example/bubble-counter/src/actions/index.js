import * as types from './ActionTypes';

// payload로 다양한 값을 받아올 필요가 없으므로 createAction을 사용하지 않음
export const increment = () => ({ type: types.INCREMENT });
export const decrement = () => ({ type: types.DECREMENT });
export const setColor = (color) => ({ 
  type: types.SET_COLOR,
  color
});