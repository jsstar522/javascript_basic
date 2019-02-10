import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

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

  color: ${oc.gray[6]};

  font-size: 1.5rem;
  cursor: pointer;

  /* 마우스 올려놓았을 때 */
  &:hover{
    background: ${oc.gray[0]};
  }
`;

// 메뉴선택 표시바
const Bar = styled.div`
  position: absolute;
  bottom: 0px;
  height: 3px;
  width: 50%;

  background: ${oc.orange[8]};
`;

// 여러개의 메뉴를 만들 수 있도록 변수에 저장
// 변수에 따로 저장하면 추가 옵션을 달기도 쉽다
const Item = ({children}) => (
  <StyledItem>
    {children}
  </StyledItem>
);

// 렌더링
const ViewSelector = () => (
  <Wrapper>
    <Item>즐겨찾기</Item>
    <Item>목록</Item>
    <Bar/>
  </Wrapper>
);

export default ViewSelector;