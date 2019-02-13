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
    favorite: PropTypes.bool,           // 즐겨찾기 값
    onToggleFavorite: PropTypes.func,   // 즐겨찾기 버튼
    onOpenModify: PropTypes.func        // 수정 버튼
  }

  render() {
    const { contacts, onOpenModify, onToggleFavorite} = this.props;
    const favoriteList = contacts
      .filter(  //favorite가 true인것만 필터링
        contact => contact.favorite
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
        {favoriteList}
      </Wrapper>
    );
  }
}

export default ContactList;