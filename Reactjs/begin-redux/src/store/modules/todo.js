import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션 정의
const CHANGE_INPUT = 'todo/CHANGE_INTPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

// 액션객체 생성 함수
export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id = 0;

const initialState = Map({
  input: '',
  todos: List(),
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
  // 글 추가, payload를 text로 지정
  [INSERT]: (state, { payload: text}) => {
    const item = Map({ id: id++, checked: false, text });
    return state.update('todos', todos => todos.push(item));
  },
  // 체크표시, id값을 찾아서 checked값 반전
  [TOGGLE]: (state, { payload: id }) => {
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.updateIn(['todos', index, 'checked'], checked => !checked);
  },
  // 삭제, id값을 찾아서 삭제
  [REMOVE]: (state, { payload: id }) => {
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.deleteIn(['todos', index]);
  }
}, initialState);