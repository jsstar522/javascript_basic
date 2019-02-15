import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// 액션정의
const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';

// 액션 생성자 함수
export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE);

// immutable Map = 객체생성
const initialState = Map({
  visible: false,
  mode: null,
  contact: Map({
    id: null,
    name: '',
    phone: '',
    color: 'red'
  })
});

// 리듀서
export default handleActions({
  [SHOW]: (state, action) => {
    const { mode, contact } = action.payload;
    return state.set('visible', true)
                .set('mode', mode)
                .set('contact', Map(contact))
  },
  [HIDE]: (state, action) => state.set('visible', false),
  [CHANGE]: (state, action) => {
    const { name, value } = action.payload;

    return state.setIn(['contact', name], value);
  }
}, initialState)