import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import { CounterActions } from 'store/actionCreators';
import { PostActions } from 'store/actionCreators';

class CounterContainer extends Component {
  // 증가/감소 메서드
  handleIncrement = () => {
    CounterActions.increment();
  }
  handleDecrement = () => {
    CounterActions.decrement();
  }

  componentDidMount() {
    // 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
    const { number } = this.props;
    // const { number, PostActions } = this.props;
    PostActions.getPost(number);
  }

  componentWillReceiveProps(nextProps) {
    // const { PostActions } = this.props;

    // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
    if (this.props.number !== nextProps.number) {
      PostActions.getPost(nextProps.number)
    }
  }

  render() {
    const { handleIncrement, handleDecrement, handlePost } = this;
    const { number, post, error, loading } = this.props;

    return (
      <Counter
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
        post={post}
        error={error}
        loading={loading}
      />
    );
  }
}

// // props 값으로 상태 정의
// const mapStateToProps = (state) => ({
//   number: state.counter.number
// });

// // props 값으로 액션 함수 바인딩
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement()),
// })

// // connect로 리액트, 리덕스 연동
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

// 위의 세단계는 다음과 같이 깔끔하게 정리 가능
export default connect(
  (state) => ({
    number: state.counter.number,
    post: state.post.data,
    loading: state.pender.pending['GET_POST'],
    error: state.pender.failure['GET_POST'],
  })
)(CounterContainer)