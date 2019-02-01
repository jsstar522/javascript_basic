import React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

const Counter = ({ number, color, index, onIncrement, onDecrement, onSetColor }) => {
  return (
    <div
      className="Counter"
      // 왼쪽클릭
      onClick={() => onIncrement(index)}
      // 오른쪽클릭시 나오는 메뉴
      onContextMenu={
        (e) => { 
          e.preventDefault(); // 그 메뉴를 없애주는 함수
          onDecrement(index);
      }
      }
      onDoubleClick={() => onSetColor(index)}
      style={{backgroundColor: color}}>
      {number}
    </div>
  );
};

// 타입설정
Counter.propTypes = {
  index: PropTypes.number,
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};

// 초기값 설정
Counter.defaultProps = {
  index: 0,
  number: 0,
  color: 'red',
  onIncrement: () => console.log('숫자가 올라갑니다.'),
  onDecrement: () => console.log('숫자가 내려갑니다.'),
  onSetColor: () => console.log('색깔이 바뀝니다.'),
}

export default Counter;