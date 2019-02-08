import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션타입정의
const CREATE = 'counter/CREATE';
const REMOVE = 'counter/REMOVE';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_COLOR = 'counter/SET_COLOR';

// 액션객체생성자정의
export const create = createAction(CREATE);         //받아야하는 인자 color
export const remove = createAction(REMOVE);
export const increment = createAction(INCREMENT);   //받아야하는 인자 index
export const decrement = createAction(DECREMENT);   //받아야하는 인자 index
export const setColor = createAction(SET_COLOR);   //받아야하는 인자 index, color

// 리듀서정의

// initial state
const initialState = Map({
  counters: List([
    Map({
      color: 'red',
      number: 0,
    })
  ])
});
// reducer
export default handleActions({
    [CREATE]: (state, action) => {
        const counters = state.get('counters');

        return state.set('counters', counters.push(
            Map({
                color: action.payload,
                number: 0
            })
        ))
    },

    [REMOVE]: (state, action) => {
        const counters = state.get('counters');

        return state.set('counters', counters.pop())
    },

    [INCREMENT]: (state, action) => {
        const counters = state.get('counters');

        return state.set('counters', counters.update(
            action.payload, 
            (counter) => counter.set('number', counter.get('number') + 1))
        );
    },

    [DECREMENT]: (state, action) => {
        const counters = state.get('counters');

        return state.set('counters', counters.update(
            action.payload, 
            (counter) => counter.set('number', counter.get('number') - 1))
        );
    },

    [SET_COLOR]: (state, action) => {
        const counters = state.get('counters');

        return state.set('counters', counters.update(
            action.payload.index, 
            (counter) => counter.set('color', action.payload.color))
        );
    },
}, initialState);
