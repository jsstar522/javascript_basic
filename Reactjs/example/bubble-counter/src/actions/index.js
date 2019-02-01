import * as types from './ActionTypes';

// payload로 다양한 값을 받아올 필요가 없으므로 createAction을 사용하지 않음

export const create = (color) => ({
  type: types.CREATE,
  color,
});

export const remove = () => ({
  type: types.REMOVE
});

export const increment = (index) => ({ 
  type: types.INCREMENT,
  index
});
export const decrement = (index) => ({ 
  type: types.DECREMENT,
  index
});
export const setColor = ({index, color}) => ({ 
  type: types.SET_COLOR,
  index,
  color
});
