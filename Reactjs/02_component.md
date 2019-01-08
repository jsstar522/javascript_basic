# Component

## Component의 모듈화

다양한 내용을 표시하는 클래스를 각각 생성할 수 있습니다.

```javascript
// component/App.js
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <h1>Header</h1>
    );
  }
}

class Content extends Component {
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
          </a>
          <button onClick={this.sayHello}>Click Me</button>
          {console.log(this)}
        </header>
      </div>
    )
  }
}


export default App;

```

다음과 같이 3개의 컴포넌트로 나눌 수 있고 App 컴포넌트에서 `<Header/>`와 `<Content/>`로 두개의 컴포넌트를 불러오고 있습니다. 하지만 `App.js` 하나에 많은 컴포넌트를 몰아넣게 되면 유지보수가 힘들어집니다. 컴포넌트를 파일단위로 나눠서 관리하는게 편합니다.

```javascript
// component/App.js

import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    );
  }
}

export default App;
```

```javascript
// component/Header.js

import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <h1>Header</h1>
    );
  }
}

export default Header;
```

```javascript
// component/Content.js

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Content extends Component {
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
          </a>
          <button onClick={this.sayHello}>Click Me</button>
          {console.log(this)}
        </header>
      </div>
    )
  }
}

export default Content;
```

위와 같이 비슷한 동작을 하는 것끼리 컴포넌트를 나눠놓으면 가독성이 좋아지고 관리하기가 편해집니다. 

