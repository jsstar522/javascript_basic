// 액션생성 함수 정의
import { createAction, handleActions } from 'redux-actions';

// 액션타입
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션객체 생성함수
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// initialize
const initialState = {
  number: 0,
}

// 리듀서 만들기
export default handleActions({
  [INCREMENT]: (state, action) => {
    return { number: state.number + 1 };
  },
  //비구조화 할당으로 정의하는 방법
  [DECREMENT]: ({ number }) => ({ number: number - 1})
}, initialState);