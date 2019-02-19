import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { number, onIncrement, onDecrement, post, error, loading } = this.props;

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrement}>증가 (+)</button>
        <button onClick={onDecrement}>감소 (-)</button>
        { loading && <h2>로딩중...</h2> }
        { error
          ? <h1>에러발생!</h1>
          : (
            <div>
              <h1>{post.title}</h1>
              <p>{post.title}</p>
            </div>
          ) }
      </div>
    );
  };
}

Counter.defaultProps = {
  number: 0
}

export default Counter;