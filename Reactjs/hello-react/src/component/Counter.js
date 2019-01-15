import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import '../App.css';

//error function
const Errorfun = () => {
  throw (new Error('버그 발생!!'));
  return (
    <div>
    </div>
  );
};

class Counter extends Component {
  state = {
    num: 0,
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  //LifeCycle API
  componentWillMount() {
    console.log('componentWillMount()');
  }
  componentDidMount() {
    console.log('componentDidMount()');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate()');
    console.log(nextState);
    if (nextState.num % 5 === 0) return false;
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate()');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate()');
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  numIncrease = () => {
    //(비구조화 할당 문법)this를 전달받아서 num 변수를 새로 선언
    const { num } = this.state;
    this.setState({
      num: num + 1
    });
  }

  numDecrease = () => {
    const { num } = this.state;
    this.setState({
      num: num - 1
    });
  }

  render() {
    if (this.state.error) return (<h1>에러가 발생했습니다</h1>);
    console.log('render()');
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.num}</div>
        <button onClick={this.numIncrease}>+</button>
        <button onClick={this.numDecrease}>-</button>
        {this.state.num == 6 && <Errorfun />}
      </div>
    )
  }
}

export default Counter;