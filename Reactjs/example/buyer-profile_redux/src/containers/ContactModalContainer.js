import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContactModal from '../components/ContactModal';
//모달이 켜지면 주변이 어둡게 변함
import Dimmed from '../components/Dimmed';

import * as modalActions from '../modules/modal';
import * as contactsActions from '../modules/contacts';

import shortid from 'shortid';

class ContactModalContainer extends Component {
  
  // modal 값 변화 감지
  handleChange = ({name, value}) => {
    const { ModalActions } = this.props;
    ModalActions.change({
      name,
      value
    });
  }
  
  // modal 창 숨기기
  handleHide = () => {
    const { ModalActions } = this.props;
    ModalActions.hide();
  }

  // 해당목록 삭제
  handleRemove = () => {
    const { ContactActions, modal } = this.props;
    const id = modal.getIn(['contact', 'id']);

    ContactActions.remove(id);
    this.handleHide();
  }

  // 해당목록 생성, 수정
  // handleAction 객체에 두 함수를 넣음.
  handleAction = {
    create: () => {
      const { ContactActions, modal } = this.props;
      // immutable로 받아오기 때문에 toJS() 실행
      const { name, phone, color } = modal.get('contact').toJS();
      const id = shortid.generate();

      ContactActions.create({
        id,
        name,
        phone,
        color,
      });

      this.handleHide();
    },

    modify: () => {
      const { ContactActions, modal } = this.props;
      const { id, name, phone } = modal.get('contact').toJS();

      ContactActions.modify({
        id,
        contact: {
          name,
          phone
        }
      });
      this.handleHide();
    }
  }

  render(){
    const { modal } = this.props;
    const { visible, mode, contact } = modal.toJS();

    const {
      handleHide,
      handleAction,
      handleChange,
      handleRemove
    } = this;

    return (
      <div>
        <ContactModal
          visible={visible}
          mode={mode}
          name={contact.name}
          phone={contact.phone}
          color={contact.color}
          onHide={handleHide}
          onAction={handleAction[mode]}
          onRemove={handleRemove}
          onChange={handleChange}
        />
        <Dimmed visible={visible}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    modal: state.modal
  }),
  (dispatch) => ({
    ContactActions: bindActionCreators(contactsActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
  })
)(ContactModalContainer);