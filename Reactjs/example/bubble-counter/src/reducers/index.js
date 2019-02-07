import * as types from '../actions/ActionTypes';
import { Map, List } from 'immutable';

// 초기상태
// 배열 counters안에 속성들이 객체로 선언되어 있다. List와 Map으로 변경
const initialState = Map({
  counters: List([
    Map({
      color: 'black',
      number: 0,
    })
  ])
});

// 리듀서 함수
function counter(state = initialState, action){
  const counters = state.get('counters');

  switch(action.type) {
    // 카운터 객체 추가
    // 배열 추가이므로 immutable push 이용
    case types.CREATE:
      return state.set('counters', counters.push(Map({
        color: action.color,
        number: 0
      })));
    // 카운터 객체 삭제 (배열형태로 쌓여있는 객체이므로 slice 이용)
    // 배열 삭제이므로 immutable pop 이용
    case types.REMOVE:
      return state.set('counters', counters.pop());
    // 해당 index를 가진 카운터 객체에서 숫자 증가 
    // 숫자 증가/감소이므로 list update 이용 
    case types.INCREMENT:
      return state.set('counters', counters.update(action.index, (counter) => counter.set('number', counter.get('number') + 1)));
    case types.DECREMENT:
    return state.set('counters', counters.update(action.index, (counter) => counter.set('number', counter.get('number') - 1)));
    // 색 변경이므로 list update 이용
    case types.SET_COLOR:
    return state.set('counters', counters.update(action.index, (counter) => counter.set('color', action.color)));
    default:
      return state;
  }
};

export default counter;

