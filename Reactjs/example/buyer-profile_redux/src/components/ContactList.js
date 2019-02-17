import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

class ContactList extends Component {
  static propTypes = {
    contacts: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        color: PropTypes.string,
        favorite: PropTypes.bool
      })
    ),
    search: PropTypes.string,           // 검색키워드에 사용
    onToggleFavorite: PropTypes.func,   // 즐겨찾기 버튼
    onOpenModify: PropTypes.func        // 수정 버튼
  }

  render() {
    const { contacts, onOpenModify, onToggleFavorite, search } = this.props;
    //그냥 name이 아닌 get('name')으로 가져와야 한다. (immutalbe)
    const contactList = contacts
      .filter(  //검색어로 필터링
        c => c.get('name').indexOf(search) !== -1
      ).sort(   //가나다순 정렬
        (a, b) => {
          if (a.get('name') > b.get('name')) return 1;
          if (a.get('name') < b.get('name')) return -1;
          return 0;
        }
      ).map(
        contact => (
          <ContactItem
            key={contact.get('id')}
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