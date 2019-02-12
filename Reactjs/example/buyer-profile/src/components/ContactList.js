import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.string,           // 검색키워드에 사용
    onToggleFavorite: PropTypes.func,   // 즐겨찾기 버튼
    onOpenModify: PropTypes.func        // 수정 버튼
  }

  render() {
    const { contacts, onOpenModify } = this.props;
    const contactList = contacts.map(
      (contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onOpenModify={onOpenModify}
        />
      )
    );
    return (
      <div>
        {contactList}
      </div>
    );
  }
}

export default ContactList;