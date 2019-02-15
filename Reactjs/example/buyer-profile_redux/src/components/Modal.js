import React, { Component } from 'react';
import styled from 'styled-components';
//컴포넌트의 외부를 클릭하는 이벤트 리스너
import onClickOutside from 'react-onclickoutside';
import { media, transitions } from '../lib/style-utils';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10;

  width: ${ props => props.width };

  /* 모바일 환경 화면 고정 */
  ${media.mobile`
    width: calc(100% - 2rem);
  `}

  /* CSSTransitionGroup 애니메이션 */
  .modal-enter {
    animation: ${transitions.slideDown} .5s ease-in-out;
    animation-fill-mode: forwards;
  }

  .modal-leave {
    animation: ${transitions.slideUp} .5s ease-in-out;
    animation-fill-mode: forwards;
  }
`;

Wrapper.propTypes = {
  width: PropTypes.string
};

const ModalBox = styled.div`
  background: white;
  border: 1px solid rgba(0,0,0,0.3);
`

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onHide: PropTypes.func,
    width: PropTypes.string,
  }
  static defaultProps = {
    width: '400px'
  }

  // 컴포넌트 외부 클릭시 실행되는 메서드(onClickoutside에 적용시킬 메서드)
  handleClickOutside = (e) => {
    const { visible, onHide } = this.props;
    //visible이 false 일 때
    if(!visible) return null;
    onHide();
  }
  // esc 키 눌렀을 때 onHide
  handleKeyUp = (e) => {
    const { onHide } = this.props;
    if(e.keyCode === 27) {
      onHide();
    }
  }
  // lifeCycle 메서드
  // esc 감지
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible){
      if(this.props.visible){
        document.body.addEventListener('keyup', this.handleKeyPress);
      }else {
        document.body.removeEventListener('keyup', this.handleKeyPress);
      }
    }
  }

  render(){
    const { visible, children, width } = this.props;
    return (
      <div>
        <Wrapper width={width}>
          <CSSTransitionGroup
            transitionName="modal"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {
              visible && (<ModalBox>{children}</ModalBox>)
            }
          </CSSTransitionGroup>
        </Wrapper>
      </div>
    );
  }
}

// 컴포넌트를 onClickOutside 라이브러리로 감싸주면
// 컴포넌트 외부를 클릭할 때, handleClickOutside 함수가 실행된다.
export default onClickOutside(Modal);
