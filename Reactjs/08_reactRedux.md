# Begin Redux

*https://velopert.com/3533을 참조하였습니다.*

## 컴포넌트 구성

- `Todos.js`, `Counter.js` : 할일목록과 카운터를 보여주는 컴포넌트
- `AppTemplate.js` : 위 두개의 컴포넌트를 반으로 나눠 한 화면에 표시해주는 컴포넌트
- `App.js`
- `Root.js` : **최상위 컴포넌트**

* `containers/CounterContainer.js` : 리덕스와 해당 컴포넌트를 연동해 줄 컴포넌트. 이러한 컴포넌트를 `컨테이너 컴포넌트`라고 합니다. 반대로 데이터를 받아서 렌더링만 수행하는 컴포넌트는 `프레젠테이셔널 컴포넌트`라고 합니다.
* `containers/TodosContainer.js` : 리덕스와 해당 컴포넌트를 연동해 줄 컴포넌트.

* `store/modules/..` : 스토어에 정의되는 리듀서를 모아놓는 곳. **이를 module이라고 하고 기능별로 분류해서 정리합니다.**
* `store/configure.js` : 스토어에 정의되는 리듀서를 모두 모듈화해서 내보내는 역할. 이는 **서버사이드에서 렌더링할 때**, 스토어를 생성하는 함수를 이 파일을 이용해서 수행합니다.
* `store/index.js` : 실제 Redux store입니다. 
* `store/actionCreators.js` : 스토어, 액션생성함수를 불러와서 dispatch, listen함수와 바인딩합니다. 



## 카운터

### Presentational Component (Counter.js)

버튼을 클릭하면 숫자가 올라가는 프레젠테이셔널 컴포넌트입니다. 

```javascript
// components/Counter.js
import React from 'react';

const Counter = ({
  number,
  onIncrement,
  onDecrement
}) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrement}>증가 (+)</button>
      <button onClick={onDecrement}>감소 (-)</button>
    </div>
  );
};

Counter.defaultProps = {
  number: 0
}

export default Counter;
```

이 컴포넌트는 `number`와 `onIncrement`, `onDecrement`를 props로 받아옵니다.

### Module (counter.js)

counter의 리듀서를 작성합니다.

```javascript
// store/modules/counter.js

// 액션타입
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션객체 생성함수
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// initialize
const initialState = {
  number: 0,
}

// 리듀서 만들기
export default function reducer(state = initialState, action){
  switch(action.type){
    case INCREMENT:
      return { number: state.number + 1 };
    case DECREMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
```

`액션타입을 정의`하고, `액션객체를 생성`했으며, `액션객체에 따른 동작을 정의하는 리듀서`까지 module에 만들었습니다. 이렇게 **module하나에 이 모든 것을 한번에 정리하는 것을 `Ducks 구조`라고 합니다.** 액션 하나가 추가되면 여러파일을 수정할 필요가 없이 하나의 파일에서 정리할 수 있습니다. 액션타입을 참조할 때는 도메인 형식으로 export하므로 다른 모듈에서도 같은 액션타입을 사용할 수 있습니다. 

조금더 편하게 액션객체 생성함수를 작성하기 위해 `createAction` 함수와 `handleAction` 함수를 사용해보겠습니다.

```javascript
// store/modules/counter.js

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
  [DECREMENT]: ({ number }) => ({ number: number - 1});
}, initialState);
```

### Reducer combine (index.js)

이제 리듀서를 리덕스에 포함시켜야 합니다.

```javascript
// store/modules/index.js

import { combineReducers } from 'redux';
import counter from './counter'

export default combineReducers({
  counter,
})
```

`combineReducers`함수로 리듀서를 합쳤습니다. 이렇게 만들어진 리듀서를 **루트 리듀서**라고 합니다.

### Configure (configure.js)

이제 리덕스 스토어에 정의된 리듀서를 내보내는 작업을 하겠습니다.

```javascript
// store/configure.js

import { createStore } from 'redux';
import modules from './modules';

const configure = () => {
  const store = createStore(moduels);
  return store;
}

export default configure;
```

리덕스를 더 편하게 관리하고 사용하기 위한 크롬 `redux-devtools`라는 것이 있습니다. 이 툴을 사용하기 위해서는 크롬 웹스토어에서 익스텐션을 설치하고 다음과 같이 configure을 바꿔줍니다.

```javascript
// store/configure.js

import { createStore } from 'redux';
import modules from './modules';

const configure = () => {
  // const store = createStore(modules);
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(modules, devTools);

  return store;
}

export default configure;
```

### Export Redux Store (index.js)

이제 createStore 함수가 포함된 configure을 실행하고 내보내는 작업을 합니다.

```javascript
// store/index.js

import configure from './configure';
export default configure();
```

이제 리듀서를 정의하고 리덕스 스토어까지 생성하는데 성공했습니다. 이제 실제 리액트 앱에 리덕스를 적용시켜야 합니다. 각 컴포넌트가 이 리덕스 스토어를 구독(listen)하고 데이터를 보내도록(dispatch) 해야합니다.

---

**리덕스와 리액트는 컨테이너 컴포넌트를 통해 연결시킵니다.** 그 전에 루트 컴포넌트(Root.js)로 가서 리덕스를 사용하는 것을 명시해줘야합니다.

```javascript
// Root.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

const Root = () => {
  return (
    <Provider store = { store }>
      <App />
    </Provider>
  );
};

export default Root;
```

`Provider`는 리액트에 리덕스를 적용시키는 역할을 합니다.

### Container Component(CounterContainer.js)

```javascript
import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import * as counterActions from 'store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  }
  handleDecrement = () => {
    this.props.decrement();
  }

  render(){
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;
    return(
      <Counter 
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

// // props 값으로 상태 정의
// const mapStateToProps = (state) => ({
//   number: state.counter.number
// });

// // props 값으로 액션 함수 정의
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement()),
// })

// // connect로 리액트, 리덕스 연동
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

// 위의 세단계는 다음과 같이 깔끔하게 정리 가능
export default connect(
  (state) => ({
    number: state.counter.number
  }),
  (dispatch) => ({
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement()),
  })
)(CounterContainer)
```

`Counter 컴포넌트`와 `App.js`사이에 `Container`가 생겼으므로 `App.js`을 다음과 같이 변경합니다.

```javascript
// components/App.js

import React, { Component } from 'react';
import AppTemplate from './AppTemplate';
//import Counter from './Counter';
import Todos from './Todos';
import CounterContainer from 'containers/CounterContainer';

class App extends Component {
  render() {
    return (
      <AppTemplate
        counter={<CounterContainer />}
        todos={<Todos />}
      />
    );
  }
}

export default App;
```

이제 버튼을 누르면 숫자가 바뀌는 것을 확인할 수 있습니다.



## Todo List

이번엔 Todo List 어플리케이션을 리덕스에 적용시켜보겠습니다.