import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.string,           // 검색키워드에 사용
    onToggleFavorite: PropTypes.func,   // 즐겨찾기 버튼
    onOpenModify: PropTypes.func        // 수정 버튼
  }

  render() {
    const { contacts, onOpenModify, onToggleFavorite, search } = this.props;
    const contactList = contacts
      .filter(  //검색어로 필터링
        c => c.name.indexOf(search) !== -1
      ).sort(   //가나다순 정렬
        (a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        }
      ).map(
        contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onOpenModify={onOpenModify}
            onToggleFavorite={onToggleFavorite}
          />
        )
      );
    return (
      <Wrapper>
        {contactList}
      </Wrapper>
    );
  }
}

export default ContactList;