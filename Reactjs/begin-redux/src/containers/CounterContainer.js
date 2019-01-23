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