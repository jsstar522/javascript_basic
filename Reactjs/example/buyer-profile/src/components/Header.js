import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// styled-components 라이브러리는 자바스크립트 내부에서 css를 정의할 수 있게 해준다.
// open-color는 다양한 색상을 편하게 사용할 수 있다.
const Wrapper = styled.div`
	height: 5rem;
    background: ${oc.blue[2]};
    border-bottom: 1px solid ${oc.blue[1]};
    /* 폰트 설정 */
    color: ${oc.blue[9]};
    font-weight: 600;
    font-size: 2.5rem;
    /* 가운데로 정렬 */
    display: flex;
    align-items: center; /* 세로 정렬 */
    justify-content: center; /* 가로 정렬 */
`;

const Header = () => (
    <Wrapper>
        프로필
    </Wrapper>
);

export default Header;