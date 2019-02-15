import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;

  background: white;
  border: 3px solid ${oc.orange[8]};
  color: ${oc.orange[8]};

  border-radius: 2rem;
  font-size: 1.5rem;
  cursor: pointer;

  /* 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 에니메이션 */
  transition: all .15s;

  /* 마우스 오버 */
  &:hover {
    transform: translateY(-0.5rem);
    color: white;
    background: ${oc.orange[8]};
  }
  /* 마우스 클릭 */
  &:active {
    background: ${oc.orange[9]};
  }
`;

const FloatingButton = ({onClick}) => (
  <Wrapper onClick={onClick}>
    +
  </Wrapper>
);

FloatingButton.propTypes = {
  onClick: PropTypes.func
}

export default FloatingButton;