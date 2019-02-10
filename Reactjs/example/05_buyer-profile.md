# 바이어 프로필 화면 만들기

*https://gist.github.com/vlpt-playground/593da90702641de2564430e2a4161eb8을 참고해서 만들었습니다.*



## 프로젝트 준비

```bash
$ create-react-app buyer-profile
```

프로젝트를 만들고 `App.css`, `logo.svh`, `App.test.js`를 지웁니다. 의존 모듈을 설치합니다.

```bash
$ yarn add open-color prop-types react-icons react-onclickoutside react-transition-group@1.x shortid styled-components
```



## 컴포넌트 만들기

### 헤더 만들기

`components/Header.js` 컴포넌트를 만듭니다.

```javascript
// components/Header.js

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
```

*(open-color에서 사용할 수 있는 색상 https://yeun.github.io/open-color/)*

렌더링 되는 가장 높은 컴포넌트인 `App.js`에서 `<div>~</div>`안에 **헤더 컴포넌트를 넣어줍니다.**

```javascript
// src/App.js

import React, { Component } from 'react';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <div>
              <Header />
            </div>
        );
    }
}
export default App; 
```

### 내용란 만들기

Header 컴포넌트 아래에 들어갈 내용란을 만들겠습니다. 메뉴는 `즐겨찾기`, `목록`으로 나뉘고 해당 메뉴버튼을 누르면 `즐겨찾기`나 `목록`을 보여주는 곳입니다. 먼저 `component/Container.js`를 만듭니다.

```javascript
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

 const Container = ({children}) => (
   <Wrapper>
       {children}
   </Wrapper>
 );

export default Container;
```

`src/App.js`에 추가합니다.

```javascript
// App.js
import Container from './components/Container';
//...
            <div>
              <Header />
              <Container />
            </div>
//...
```

### 메뉴창/ 메뉴선택 표시바 만들기

이제 어떤 메뉴를 눌렀는지 알 수 있도록 메뉴창 아래에 움직이는 표시바을 만들어 보겠습니다.

```javascript
// components/ViewSelector.js

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

  background: ${oc.pink[6]};
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
    <Item>메뉴</Item>
    <Bar/>
  </Wrapper>
);

export default ViewSelector;
```

이제 `App.js`에 적용시켜줍니다.

```javascript
// App.js
//...
import ViewSelector from './components/ViewSelector';
//...
            <div>
                <Header/>
                <ViewSelector/>
                <Container>
                </Container>
            </div>
//...
```

이제 이런화면이 나타납니다. ![buyerProfile_1](img/buyerProfile.png)

이제 메뉴에 따라서 다른 화면을 보여주게끔 장치를 만들어줘야합니다. 위에서 만들었던 `Container` 컴포넌트를 수정합니다.

```javascript
// components/Container.js

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
```

