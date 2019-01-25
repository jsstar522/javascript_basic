import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

// 리덕스스토어 연결
import { createStore } from 'redux';
import reducers from './reducers'

// 리액트-리덕스 연결
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

