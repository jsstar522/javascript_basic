import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

class FavoriteList extends Component {
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
    onToggleFavorite: PropTypes.func,   // 즐겨찾기 버튼
    onOpenModify: PropTypes.func        // 수정 버튼
  }

  render() {
    const { contacts, onOpenModify, onToggleFavorite} = this.props;
    const favoriteList = contacts
      .filter(  //favorite가 true인것만 필터링
        contact => contact.get("favorite")
      ).sort(   //가나다순 정렬
        (a, b) => {
          if (a.get("name") > b.get("name")) return 1;
          if (a.get("name") < b.get("name")) return -1;
          return 0;
        }
      ).map(
        contact => (
          <ContactItem
            key={contact.get("id")}
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

export default FavoriteList;