# 리덕스 미들웨어

리덕스 미들웨어는 **리듀서가 액션을 처리하기 전에** 실행되는 작업입니다. 리덕스의 전체 흐름은 다음과 같습니다.

![middleware](img/middleware.png)

*(참조: https://d2.naver.com/helloworld/1848131)*

액션을 가져와서 리듀서에서 `dispatch()`로 처리하기 전후로 미들웨어를 거칩니다. 미들웨어를 사용하는 용도는 로깅(logging)과 비동기 작업처리 목적이 가장 큽니다. 로깅을 할 수 있다는 것은 에러가 발생했을 때, 어디서 에러가 발생했는지 알 수 있다는 뜻입니다. `buyer-profile_redux` 프로젝트에 미들웨어를 추가해보겠습니다(https://github.com/jsstar522/javascript_basic/tree/master/Reactjs/example/buyer-profile_redux). 



## logger 미들웨어 만들기

로거 미들웨어는 리듀서가 실행될 때마다 액션, 상태 등을 콘솔에 찍어낼 수 있는 미들웨어입니다. 

```javascript
// src/lib/loggerMiddleware.js

const loggerMiddleware = store => next => action => {
  // 현재 상태와 액션
  console.log('현재 상태', store.getState());
  console.log('액션', action);

  // 다음 미들웨어로 넘기기
  const result = next(action);

  // 액션 처리 후의 상태
  console.log('다음 상태', store.getState());
  console.log('\n');

  // next(action)을 반환해야 다음 미들웨어/리듀서가 작업을 이어갈 수 있다.
  return result;
}
export default loogerMiddleware;
```

예를들어 목록추가 버튼(FloatingButton)을 눌렀을 때 이 미들웨어를 거치는 과정을 생각해보죠. 

1. `modal/SHOW 라는 액션객체가 만들어지고 전달`됩니다. 
2. 이 액션은 리듀서에서 처리되기 전에 위와 같은 미들웨어를 거치게 되는데, `store`, `next`, `action`을 인자로 전달받고 있는 미들웨어입니다.
3. `store`에 현재 상태가 들어있습니다. action은 버튼을 눌렀을 때, `modal/SHOW` 액션객체를 만들었습니다. **이 미들웨어에서 이 두 내용을 콘솔에 출력합니다.**
4. next는 다음 미들웨어로 넘기거나 미들웨어가 없다면 다음 리듀서로 넘깁니다.
5. 리듀서로 작업이 처리된 이후에 상태를 출력합니다.
6. 다음 미들웨어/리듀서에서 액션객체를 그대로 사용할 수 있도록 `result`를 반환합니다.

**미들웨어는 스토어에 적용시킵니다.**

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
import { Provider } from 'react-redux';

import loggerMiddleware from './lib/loggerMiddleware';


// 리덕스 스토어
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducers, applyMiddleware(loggerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

이제 작업을 할 때마다 콘솔에 액션과 상태가 기록됩니다.

![middleware_2](img/middleware_2.png)



## 미들웨어 라이브러리 사용

`redux-logger`는 로그를 기록해주는 미들웨어 라이브러리입니다. 

```bash
$ yarn add redux-logger
```

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
import { Provider } from 'react-redux';

import { createLogger } from 'redux-logger';

// 리덕스 스토어
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

logger를 사용하는 것은 중요하지만 사실 위 코드에서 주석처리 해놓은 `REDUX DEVTOOLS`가 더 효율적입니다.



## 비동기 작업 처리

미들웨어를 사용하는 또 다른 큰 이유는 비동기 작업을 처리하기 위해서입니다. 