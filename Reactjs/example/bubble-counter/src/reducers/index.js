import * as types from '../actions/ActionTypes'

// 초기상태
const initialState = {
  counters: [
    {
      color: 'black',
      num: 0
    }
  ]
}

// 리듀서 함수
function counter(state = initialState, action){
  const { counters } = state;

  switch(action.type) {
    // 카운터 객체 추가
    case types.CREATE:
      return {
        counters: [
          ...counters,
          {
            color: action.color,
            number: 0
          }
        ]
      };
    // 카운터 객체 삭제 (배열형태로 쌓여있는 객체이므로 slice 이용)
    case types.REMOVE:
      return {
        counters: counters.slice(0, counters.length - 1)
      };
    // 해당 index를 가진 카운터 객체에서 숫자 증가  
    case types.INCREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number + 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    case types.DECREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number - 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    case types.SET_COLOR:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            color: action.color
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };
    default:
      return state;
  }
};

export default counter;

