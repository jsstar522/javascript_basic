# Input State

## 전화번호부 만들기

```bash
$ create-react-app phone-book
```

먼저 첫번째 컴포넌트를 생성합니다.

```javascript
// src/components/PhoneForm.js

import React, { Component } from 'react';

class PhoneForm extends Component{
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  }
  render(){
    return(
      <form>
        <input 
          placeholder = "이름"
          value = {this.state.name}
          onChange = {this.handleChange}
        />
        <div>{this.state.name}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

`onChange` 이벤트가 발생하면 `handleChange`에서 현재의 value 값을 가져올 수 있습니다. `onChange`이기 때문에 input값이 바뀔 때마다 이벤트가 발생합니다. 이제 `App.js`에서 컴포넌트를 붙여보겠습니다. 

```javascript
// App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```

`input`창에 값을 넣을 때마다 `onChange`이벤트가 발생하고 창 아래에 `<div>{this.state.name}</div>`으로 바뀐 텍스트를 보여주고 있습니다. 이번엔 전화번호를 적어보겠습니다. 다른 컴포넌트를 만들어도 되지만 `input name` 속성을 통해서 하나의 컴포넌트로 처리해보겠습니다.

```javascript
// src/components/PhoneForm.js

import React, { Component } from 'react';

class PhoneForm extends Component{
  state = {
    name: '',
    phone: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(){
    return(
      <form>
        <input 
          placeholder = "이름"
          value = {this.state.name}
          onChange = {this.handleChange}
          name = "name"
        />
        <input 
          placeholder = "전화번호"
          value = {this.state.phone}
          onChange = {this.handleChange}
          name = "phone"
        />
        <div>{this.state.name}{this.state.phone}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

`Computed property names` 문법을 사용해서 target의 정보를 조회했습니다.

이제 state 안에 있는 `name`과 `phone` 정보를 부모 컴포넌트로 전달받도록 하겠습니다. 부모 컴포넌트인 `App.js`에서 `handleCreate`라는 메서드를 만들고 `PhoneForm.js` 컴포넌트로 전달하겠습니다. 

```javascript
// App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }
  render() {
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```

```javascript
// components/PhoneForm.js

import React, { Component } from 'react';

class PhoneForm extends Component{
  state = {
    name: '',
    phone: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // 페이지 리로드 방지
    e.preventDefault();
    // onCreate를 통해 상태를 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: '',
    });
  }

  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
        <input 
          placeholder = "이름"
          value = {this.state.name}
          onChange = {this.handleChange}
          name = "name"
        />
        <input 
          placeholder = "전화번호"
          value = {this.state.phone}
          onChange = {this.handleChange}
          name = "phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```

* `preventDefault`는 submit 이후 다시 랜더링 되면서 상태가 초기화 되는 것을 방지합니다. 이 함수를 빼고 실행해보면 어떤일이 발생하는지 알 수 있습니다.
* `onCreate`함수를 props를 통해 부모 컴포넌트(`App.js`)에서 받아서 사용하고 있습니다. 그리고 상태를 초기화 합니다.
* `onSubmit` 이벤트를 form 태그에 달아서 위의 작업들이(`handleSubmit`)가 실행되도록 설정했습니다.