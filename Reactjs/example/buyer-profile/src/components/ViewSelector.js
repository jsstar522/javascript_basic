import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 4rem;
  background: white;
  width: 100%;
  display: flex;

  position: relative;
`;

// 메뉴
const StyledItem = styled.div`
  height: 100%;

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  /* active 값에 따라 다른 색상을 보여줌 */
  color: ${ props => props.active ? oc.gray[9] : oc.gray[6] };

  font-size: 1.5rem;
  cursor: pointer;

  /* 마우스 올려놓았을 때 */
  &:hover{
    background: ${oc.gray[0]};
  }
`;

StyledItem.propTypes = {
  active: PropTypes.bool
};

// 메뉴선택 표시바
const Bar = styled.div`
  position: absolute;
  bottom: 0px;
  height: 3px;
  width: 50%;

  background: ${oc.orange[8]};

  /* 애니메이션 */
  transition: ease-in .25s;

  /* right 값에 따라 우측으로 이동 */
  transform: ${props => props.right ? 'translateX(100%)' : 'none'};
`;

Bar.propTypes = {
  right: PropTypes.bool
};

// 여러개의 메뉴를 만들 수 있도록 변수에 저장
// 변수에 따로 저장하면 추가 옵션을 달기도 쉽다
const Item = ({children, selected, name, onSelect}) => (
  <StyledItem onClick={() => onSelect(name)} active={selected===name}>
    {children}
  </StyledItem>
);

Item.propTypes = {
  selected: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func
};

// 렌더링
const ViewSelector = ({selected, onSelect}) => (
  <Wrapper>
    <Item
      selected={selected}
      name="favorite"
      onSelect={onSelect}>
      즐겨찾기
    </Item>
    <Item
      selected={selected}
      name="list"
      onSelect={onSelect}>
      목록
    </Item>
    <Bar right={selected==='list'}/>
  </Wrapper>
);

ViewSelector.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.string
}

export default ViewSelector;