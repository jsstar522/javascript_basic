import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { number, onIncrement, onDecrement, post, error, loading } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrement}>증가 (+)</button>
        <button onClick={onDecrement}>감소 (-)</button>
        <h1>{post.title}</h1>
      </div>
    );
  };
}

Counter.defaultProps = {
  number: 0
}

export default Counter;