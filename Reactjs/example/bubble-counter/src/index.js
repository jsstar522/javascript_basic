import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

// 리덕스스토어 연결
import { createStore } from 'redux';
import reducers from './modules'
// 리액트-리덕스 연결
import { Provider } from 'react-redux';

// "리덕스 확장프로그램 사용설정과 함께" 스토어 생성
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

