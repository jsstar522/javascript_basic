# 배열, Array

리엑트에서는 state의 내부의 값을 직접 수정하면 안됩니다(불변성 유지). `this.state.array.push('값')`과 같은 형식으로 쓸 수 없습니다. 값을 변화시키는 대신 새로운 배열을 만들어 내야합니다. `concat`, `slice`, `map`, `filter`와 같은 함수를 사용해야 합니다.

## 데이터 추가

이름과 전화번호를 받아서 배열로 된 state에 추가되도록 하겠습니다.

```javascript
// App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  id = 2
  state = {
    information: [
    {
      id: 0,
      name: 'park',
      phone: '010-1234-5678',
    },
    {
      id: 1,
      name: 'lee',
      phone: '010-5459-7895',
    }
    ]
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;
```

`handleCreate` 메서드는 information 배열에 `concat`을 통해 새로운 값을 추가하고 있습니다. 이렇게 요소를 추가한 뒤 새로 만들어서 배열을 사용합니다.

## 데이터 렌더링

요소 하나하나를 렌더링하기 위해서 배열의 `map` 메서드를 사용합니다. 전화번호 리스트를 보여주는 컴포넌트와 하나의 전화번호의 정보를 보여주는 컴포넌트를 만들어 보겠습니다. 먼저 하나의 전화번호의 정보를 보여주는 `PhoneInfo` 컴포넌트입니다.

```javascript
// components/PhoneInfo.js

import React, { Component } from 'react';

class PhoneInfo extends Component{
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0,
    }
  }
  render(){
    const style = {
      boder: '1px solid black',
      padding: '8px',
      margin: '8px',
    }
    const {
      name, phone, id
    } = this.props.info;

    return(
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;
```

해당 이름과 해당 전화번호를 렌더링 합니다. `name`과 `phone`, `id`는 props를 통해 전달 받습니다.

```javascript
// components/PhoneInfoList.js

import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo'

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
  }
  render(){
    const { data } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={info.id} info={info}/>)
    );
    render(
      <div>
        {list}
      </div>
    )
  }
}

exrport default PhoneInfoList;
```

`map`을 통해서 list를 하나씩 렌더링 합니다. 여기서 key는 배열을 렌더링할 때 필요한 값입니다. 받아온 배열(`info`)의 id를 key값으로 받습니다. **배열의 key값은 고유하게 사용하는 것이 효율적입니다.** 그렇지 않으면 key값이 자동으로 부여되는데, 만약 배열 요소들 사이에서 렌더링되는 요소이 추가된다면 배열의 순서는 모두 바뀌고 자동으로 부여되는 key값 역시 대부분 바뀌게 됩니다. 이는 변화된 값만 Virtual DOM에서 감지한 뒤 렌더링 해주는 리엑트에서는 비효율적이라고 볼 수 있습니다.

```text
* key 자동부여								* 고유 key 부여
<Phoneinfo key = 1>내용1					<Phoneinfo key = 1>내용1				
<Phoneinfo key = 2>내용2					<Phoneinfo key = 2>내용2
<Phoneinfo key = 3>내용3					<Phoneinfo key = 3>내용3
----내용2 아래 내용4 추가----				 ----내용2 아래 내용4 추가----
<Phoneinfo key = 1>내용1					<Phoneinfo key = 1>내용1				
<Phoneinfo key = 2>내용2					<Phoneinfo key = 2>내용2
<Phoneinfo key = 3>내용4	*				<Phoneinfo key = 4>내용4  *
<Phoneinfo key = 4>내용3					<Phoneinfo key = 3>내용3
```

위의 예시를 보면 key를 자동으로 부여하면 `내용3의 key가 바뀌지만` 고유 key를 부여하면 `새로운 요소만 새로운 key와 함께 추가`되는 것을 볼 수 있습니다. 이제 `App.js`에서 data 값을 전달하겠습니다.

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfo from './components/PhoneInfo';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
    {
      id: 0,
      name: 'park',
      phone: '010-1234-5678',
    },
    {
      id: 1,
      name: 'lee',
      phone: '010-5459-7895',
    }
    ]
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        {JSON.stringify(information)}
        <PhoneInfoList data = {this.state.information} />
      </div>
    );
  }
}

export default App;
```



 