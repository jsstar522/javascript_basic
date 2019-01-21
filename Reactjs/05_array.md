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



## 데이터 삭제

데이터를 삭제할 때도 기존에 있던 데이터를 직접적으로 변경해선 안됩니다. 

```javascript
const array = [1, 2, 3, 4, 5];
```

다음과 같은 배열이 있을 때, 가운데에 있는 '3'을 빼고 싶다면 이렇게 하면 됩니다.

```javascript
array.slice(0, 2).concat(array.slice(3, 5));
```

```javascript
[...array.slice(0, 2), ...array.slice(3, 5)];
```

새로운 배열 [1, 2, 4, 5]가 만들어지게 됩니다. 하지만 더 간편하게 요소를 필터링 해서 '새로운' 배열을 만들어주는 `array`자체 메서드가 존재합니다.

```javascript
array.filter(num => num !== 3);
```

3이 아닌 요소들만 골라서 새로운 배열 [1, 2, 4, 5]를 만듭니다. 이제 전화번호부를 삭제하는 기능을 만들어 보겠습니다. `App.js`에 메서드를 추가합니다.

```javascript
// App.js
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

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  
  render() {
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        {JSON.stringify(this.state.information)}
        <PhoneInfoList 
          data = {this.state.information} 
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;

```

**이제 하위 컴포넌트에게 `handleRemove`메서드를 담은 `onRemove`를 전달해주기 위해서 props를 사용합니다.**

```javascript
// components/PhoneInfoList.js

import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
  }
  render(){
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={info.id} info={info} onRemove={onRemove}/>)
    );
    return(
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
```

이제 전화번호부 하나하나 당 삭제버튼을 만들기 위해 `/components/PhoneInfo.js`에 기능을 추가하겠습니다.

```javascript
// components/PhoneInfo.js

import React, { Component } from 'react';

class PhoneInfo extends Component{
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0,
    },
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 실행됨
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }
  

  render(){
    const style = {
      border: '1px solid black',
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
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
```



## 데이터 업데이트

데이터 업데이트 역시 불변성 유지를 지켜야 합니다. `array.map`을 이용해서 바꾸고자 하는 데이터에 조건을 걸어 새로운 배열을 만듭니다.

```javascript
const array = [
    {id: 0, text: 'First', tag: 'a'},
    {id: 1, text: 'Second', tag: 'b'},
    {id: 2, text: 'Third', tag: 'c'}
]

const newArray = array.map(item => item.id === 1 ? ({...item, text: 'new Second'}):item)
```

이제 업데이트 메서드를 추가하겠습니다.

```javascript
// App.js

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

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info => id === info.id ? {...info, ...data} : info)
    })
  }
  
  render() {
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        {JSON.stringify(this.state.information)}
        <PhoneInfoList 
          data = {this.state.information} 
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```

`PhoneInfo.js`를 수정하기 전에 `PhoneInfoList.js`를 수정하겠습니다. **list에서 `onUpdate`가 실행되면 props로 전달 받은 메서드가 실행되게 합니다.** `onRemove`와 같이 props를 사용하는 컴포넌트이므로 default값이 필요합니다.

```javascript
// components/PhoneInfoList.js

import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }
  render(){
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (<PhoneInfo 
        key={info.id} 
        info={info} 
        onRemove={onRemove}
        onUpdate={onUpdate}
        />)
    );
    return(
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
```

**이제 리스트 하나하나당 버튼을 만들어서 버튼을 눌렀을 때, Update할 수 있는 새로운 창을 만들고, `수정`을 눌렀을 때 메서드가 실행되도록 하겠습니다.** 새로운 창을 만들기 위해서 수정중임을 알려주는 변수가 필요합니다. 이를 state 안에 editing으로 정하겠습니다.

```javascript
// components/PhoneInfo.js

import React, { Component } from 'react';

class PhoneInfo extends Component{
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0,
    },
  }
  // 수정 중임을 알려주는 변수들
  state = {
    //true면 수정중
    editing: false,
    //수정할 때, name창에 들어간 text를 저장할 곳
    name: '',
    //수정할 때, phone창에 들어간 text를 저장할 곳
    phone: '',
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 실행됨
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  //editing을 바꿔주는 함수
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing});
  }

  //수정할 text를 받는 함수
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  render(){
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px',
    }
    const { editing } = this.state;

    
    if (editing) { // 수정모드
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }


    // 일반모드
    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
```







 