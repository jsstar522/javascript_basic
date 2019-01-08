# ReactJS

## ReactJS의 탄생

**리엑트는 프론트엔드 라이브러리입니다.** 우리는 처음에 웹 페이지를 HTML 문서를 통해 만들었습니다. 단순히 텍스트와 같은 정적인 정보만을 전달했죠. 이후에는 CSS를 통해서 조금더 스타일리시한 정보를 전달했고, 자바스크립트를 통해서 동적인 정보를 전달했습니다. 브라우저는 사용자에게 정보를 보여주기 위해 다음과 같이 동작합니다.

![workflow](browserWorkflow.png)

* 브라우저는 Paser를 통해서 HTML 문서를 전달받고 DOM(노드로 구성된 트리)을 만듭니다. 
* CSS 파일을 Parsing해서 스타일을 처리합니다. 이 과정을 `Attachment`라고 합니다. `Attachment`를 통해 새롭게 만들어진 Tree를 `Render Tree`라고 합니다. 스타일을 입힌 노드가 생성될 때는 노드의 `attach` 메서드가 실행되고 새로운 객체형태로 반환됩니다.
* 화면상에 표시할 작업들을 마킹하는 Layout이 진행됩니다. (청사진)
* 노드의 `paint` 메서드를 통해 화면에 마킹된 내용이 나타납니다.

일반적인 DOM이 생성되고 화면에 나타나는 과정입니다. 만약에 화면의 내용이 바뀐다면 어디서부터 진행이 될까요? 바로 처음부터입니다. 내용이 하나 바뀔 때마다 처음부터 다시 렌더링이 진행됩니다. **문서의 정보가 바뀐다면 새롭게 HTML parsing을 통해서 새로운 Render Tree를 만들고, 스타일이 바뀐다면 새롭게 Style Sheets parsing을 통해서 새로운 Render Tree를 만듭니다.** 그리고 바뀌지 않은 노드들도 다시 렌더링 되죠. 이는 매우 비효율적입니다. 브라우저가 약 120프레임의 빠른 변화를 소화할 수 있는 게임엔진만큼 빠르지 않기 때문에(그럴 필요도 없었던 브라우저 엔진의 속도는 제한적입니다.) 동적인 화면을 구축하려면 이 방법은 비효율적일 수 밖에 없습니다. 그래서 **React는 Virtual `DOM(가상 DOM)`을 사용합니다.**

## Virtual DOM

Virtual DOM을 설명하기 전에 다음과 같은 예시를 들어보겠습니다. 3000개의 노드가 있는 한 페이지의 DOM이 있습니다. 우리는 이 3000개의 노드 중에서 광고배너에 해당하는 노드를 1초에 한번씩 다른 배너로 바꾸는 작업을 하고 싶습니다. 동시에 1초에 한번씩 홈페이지의 제목이 깜빡거리는 스타일을 넣고 싶습니다. 자바스크립트가 필요하겠죠? 다음과 같이 대충 비스무리하게 작성해봅니다.

```javascript
let i = 0;
while(1){
	document.getElementById('banner').src = bannerList[i];
	i++;
    if(i > bannerList.length){
        i = 0;
    }
    // +1초 break가 들어가는 코드
}
//...제목 깜빡거리는 코드...
```

자바스크립트가 HTML 문서를 바꿨습니다! DOM은 정직하게 첫번째 node부터 3000번째 node 중 바뀐 부분을 찾아 다시 Render Tree를 만듭니다. **일단 배너가 바뀐 부분부터요! 그리고 나서 제목을 깜빡거리는 DOM까지 총 두번 렌더링합니다.** 예를들어서 이렇게 바뀐부분을 찾고 다음 바뀐부분을 찾아서 모두 렌더링하는 과정이 한번에 1.5초가 걸린다고 가정해보죠. **자바스크립트는 1초에 한번씩 배너를 바꾸고 있지만 브라우저는 바뀐 부분을 찾느라 1.5초를 소비하므로 딜레이가 걸릴 수 밖에 없습니다.** 우리가 게임을 하다보면 화면에 렉이 걸리는 이유도 이와 비슷한 원리입니다. 렌더링 속도가 늦기 때문이죠. 이 문제를 보완하기 위해서 나온 개념이 `Virtual DOM`입니다. **자바스크립트가 정보를 바꾸면 가상 DOM이 변화된 부분을 종합해서 DOM에게 보고하면 변경사항이 한번에 반영됩니다. 진짜 DOM은 일일이 탐색하지 않아도 뒤에서 그 일을 가상 DOM이 대신해주고 있죠.** React는 이러한 Virtual DOM을 채택했습니다. 

## ReactJS 사용

다음과 같이 npm으로 리엑트를 설치합니다.

```bash
$ sudo npm install -g create-react-app
```

리엑트 프로젝트를 진행할 폴더에서 다음과 같이 프로젝트를 생성합니다.

```bash
$ create-react-app hello-react
```

폴더 하위에 `hello-react`라는 리엑트 프로젝트가 생성되었습니다. `hello-react` 폴더로 이동해서 `npm start` or `yarn start`를 통해 프로젝트를 실행시킬 수 있습니다.



## JSX

리엑트는 일반 자바스크립트 문법을 사용할 수도 있지만 JSX 문법을 사용하면 더 유리합니다. JSX 문법이 사용된 `src/App.js`파일을 확인해보죠.

```react
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  sayHello() {
    alert('Hello');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            <button onClick={this.sayHello}>Click Me</button>
			{/*this 확인*/}
            {console.log(this)}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

* import는 ES6에서 사용할 수 있는 문법으로 `import React from 'react';` = `var React = require('react');`와 같습니다. 여기서 react는 `Component`의 사용을 가능하게 하는 모듈입니다.
* class 역시 ES6에서 새롭게 사용할 수 있습니다. `App 클래스`는 prototype으로 따로 선언할 필요없이 Componet를 상속합니다.
* class 안의 `render()`는 이하 내용을 렌더링해서 화면에 보여줍니다.
* JSX 안쪽의 내용은 HTML과 거의 유사합니다.
* 렌더링 되는 내용의 element들은 **div(container element)로 감싸줘야 합니다.**
* 자바스크립트 문법을 사용하려면 `{}`으로 감싸주면 됩니다.
* 메서드를 사용할 수 있습니다. **클래스 안의 `render() ` 함수 안에서 메서드를 사용하므로** `this.sayHey`로 작성합니다. 뒤의 `()`는 붙이지 않습니다. 붙이면 페이지가 로드됨과 동시에 함수가 바로 실행되기 때문입니다.
* JSX 안에서 사용하는 자바스크립트는 if문을 사용할 수 없습니다. `ternary(condition ? true : false)`를 사용해야 합니다.

