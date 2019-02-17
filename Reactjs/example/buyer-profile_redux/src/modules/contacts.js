import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션정의
const CREATE = 'contact/CREATE';
const MODIFY = 'contact/MODIFY';
const REMOVE = 'contact/REMOVE';
const TOGGLE_FAVORITE = 'contact/TOGGLE_FAVORITE';

// 액션 생성자 함수
export const create = createAction(CREATE);
export const modify = createAction(MODIFY);
export const remove = createAction(REMOVE);
export const toggleFavorite = createAction(TOGGLE_FAVORITE);

// immutable 배열생성
const initialState = List([
]);

// 리듀서
export default handleActions({
  [CREATE]: (state, action) => {
    return state.push(Map(action.payload));
  },
  [MODIFY]: (state, action) => {
    const index = state.findIndex(contact => contact.get('id') === action.payload.id);
    return state.mergeIn([index], action.payload.contact);
  },
  [REMOVE]: (state, action) => {
    const index = state.findIndex(contact => contact.get('id') === action.payload);
    return state.delete(index);
  },
  [TOGGLE_FAVORITE]: (state, action) => {
    const index = state.findIndex(contact => contact.get('id') === action.payload);
    return state.update(index, contact => contact.set('favorite', !contact.get('favorite')));
  }
}, initialState)