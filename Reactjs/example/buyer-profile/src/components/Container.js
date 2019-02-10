import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
// 화면별 스타일 모듈화
import { media } from '../lib/style-utils';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 700px;
    margin: 0 auto; /* 가운데 정렬 */
    padding: 1rem;
    background: black; /* 테스트용 색상, 추후 지워짐 */
    
    /* 모바일 크기 */
    ${media.mobile`
        width: 100%;    
    `}
`;

// // 바로 나오도록 테스트
// const Container = ({children}) => (
//   <Wrapper>
//       {children}
//   </Wrapper>
// );

// visible을 props로 받아서 화면을 보여줄지 null을 반환할지 구분
const Container = ({visible, children}) => visible ? (
  <Wrapper>
      {children}
  </Wrapper>
) : null;

// PropTypes 설정
Container.propTypes = {
  visible: PropTypes.bool
};

export default Container;