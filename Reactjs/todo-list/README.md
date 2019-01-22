# TodoList 만들기

## 컴포넌트 구성

* Todo Template: 등록된 글들의 템플릿
* Form: 글을 등록시키는 Form
* Todo ItemList
* Todo Item

### Todo Template

`src/components/TodoListTemplate.js`를 먼저 만듭니다.

```javascript
import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, children}) => {
  return(
    <main className="todo-list-template">
      <div className="title">
        오늘 할 일
      </div>
      <section className="form-wrapper">
        { form }
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  );
}

export default TodoListTemplate;
```

함수형 컴포넌트(클래스X)입니다. props들을 인자로 받습니다. props는 form과 children이 있습니다. **이런식으로 props를 인자로 받으면 JSX를 props로 받을 수 있습니다.** props를 인자로 받는 함수이므로 원래는 `(props) => {...}`으로 사용해야 하지만 `({form, children}) => {...}`으로 사용해서 이후에 `props.form`과 `props.children`이 아닌 `form`과 `children`으로 자유롭게 사용할 수 있습니다. 그리고 `from = {<div>안녕하세요</div>}`와 같이 JSX를 props에 편하게 넣을 수 있어 자질구레한 컴포넌트를 따로 만들지 않아도 됩니다.

함수형 컴포넌트(클래스X)입니다. props들을 인자로 받습니다. props는 `form`과 `children`이 있습니다. **이런식으로 props를 인자로 받으면 JSX를 props로 받을 수 있습니다.** 

`src/components/TodoListTemplate.css`를 작성합니다.

```css
.todo-list-template {
  background: white;
  width: 512px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); /* 그림자 */ 
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
}

.title {
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #22b8cf;;
  color: white;
}

.form-wrapper {
  padding: 1rem;
  border-bottom: 1px solid #22b8cf;
}

.todos-wrapper {
  min-height: 5rem;
}
```

이제 이 두개를 루트 컴포넌트(`App.js`)에 연결합니다.

```javascript
// App.js

import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';

class App extends Component {
  render() {
    return (
      <TodoListTemplate>하이</TodoListTemplate>
    );
  }
}

export default App;
```

`TodoListTemplate.js`를 함수형 컴포넌트로 사용하고 props를 인자로 받아오기 때문에 다음과 같이 렌더링될 수 있습니다. 

### Form

글을 등록하는 컴포넌트를 만들겠습니다.

`src/components/Form.js`를 먼저 작성합니다.

```javascript
import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
  return(
    <div className="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate}>추가</div>
    </div>
  );
};

export default Form;
```

**`Form.js` 컴포넌트는 다섯가지의 props를 인자로 받는 함수형 컴포넌트입니다.**  `value`는 내용, `onChange`는 내용이 변경될 때 실행되는 함수, `onCreate`는 버튼이 클릭될 때 실행되는 함수, `onKeyPress`는 Enter키를 눌렀을 때, onCreate 함수와 같은 작업이 실행될 때 사용됩니다.

`src/components/Form.css`를 작성합니다.

```css
.form {
  display: flex;
}

.form input {
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #c5f6fa;
}

.create-button {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  background: #22b8cf;
  border-radius: 3px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.create-button:hover {
  background: #3bc9db;
}
```



### Todo ItemList

리스트를 보여주는 동적인 컴포넌트일 경우에는 함수형 컴포넌트가 아닌 클래스형 컴포넌트로 작성합니다.

`src/components/TodoItemList.js`를 작성합니다.

```javascript
import React, {Component} from 'react';

class TodoItemList extends Component{
  render(){
    const { todos, onToggle, onRemove } = this.props;
    return(
      <div>

      </div>
    );
  }
}

export default TodoItemList;
```

`TodoItemList.js`는 3개의 props를 받습니다. `todos`는 todo 객체가 들어있는 배열, `onToggle`는 체크박스를 켜고 끄는 함수, `onRemove`는 Item을 삭제시키는 함수입니다.

### Todo Item

하나의 Item 컴포넌트입니다. Item은 체크박스와 삭제버튼이 있어야하고 함수를 props로  `TodoItemList.js`에게 전달해야합니다. TodoItem 역시 최적화를 위해 클래스형 컴포넌트로 작성합니다. 먼저 `TodoItem.js`를 작성합니다.

```javascript
import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component{
  render(){
    const { text, checked, id, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${checked && 'checked'}`}>
          <div>{ text }</div>
        </div>
        {
          checked && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default TodoItem;
```

`ToddItem.js`은 다섯개의 props를 받습니다. `text`는 todo의 내용, `checked`는 체크박스의 상태, `id`는 todo의 고유번호, `onToggle`은 체크박스를 켜고 끄는 함수, `onRemove`는 Item을 삭제하는 함수입니다. `stopPropagation`함수는 부모 Element에 있는 이벤트`onToggle`이 실행되는걸 막아줍니다. 이제 `TodoItem.css`를 작성합니다.

```css
.todo-item {
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.todo-item:hover {
  background: #e3fafc;
}

/* todo-item 에 마우스가 있을때만 .remove 보이기 */
.todo-item:hover .remove {
  opacity: 1;
}

/* todo-item 사이에 윗 테두리 */
.todo-item + .todo-item {
  border-top: 1px solid #f1f3f5;
}


.remove {
  margin-right: 1rem;
  color: #e64980;
  font-weight: 600;
  opacity: 0;
}

.todo-text {
  flex: 1; /* 체크, 엑스를 제외한 공간 다 채우기 */
  word-break: break-all;
}

.checked {
  text-decoration: line-through;
  color: #adb5bd;
}

.check-mark {
  font-size: 1.5rem;
  line-height: 1rem;
  margin-left: 1rem;
  color: #3bc9db;
  font-weight: 800;
}
```



## 상태관리

컴포넌트는 모두 만들었습니다. 이제 상태를 관리해야합니다. State가 들어가는 곳은 `Form`과 `TodoItemList`입니다.(`TodoItem`은 `TodoItemList`에 의해 변합니다.) `Form`에서 주는 value가 `TodoItemList`의 todos로 등록됩니다. 이렇게 **두 컴포넌트가 상호작용할 때, 부모 컴포넌트(`App.js`)를 통해 상호작용해야 합니다.** 먼저 초기상태를 state를 `App.js`에 등록합니다. 그리고 하위 컴포넌트에게 전달할 메서드를 정의합니다. `onCreate`와 `onChange`, `onKeyPress`에 전달될 함수입니다.

```javascript
// App.js

import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 2
  state = {
    input: '',
    todos: [
      {id:0, text:'첫번째 할일', checked: false},
      {id:1, text:'두번째 할일', checked: true},
    ]
  }
  //값 변경
  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  //글 등록
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', //클릭과 동시에 input 비우기
      todos: todos.concat({ //클릭과 동시에 input이 추가된 배열 생성
        id: this.id++,
        text: input,
        checked: false,
      })
    })
  }
  //엔터키
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
    } = this;
    return (
    <TodoListTemplate form={(
      <Form
        value = { input }
        onKeyPress = { handleKeyPress }
        onChange = { handleChange }
        onCreate = { handleCreate }
      />
    )}>
      <TodoItemList todos = {todos}/>
    </TodoListTemplate>
    );
  }
}

export default App;

```

**`Form`에게 `value = { input} `, `onKeyPress = { handleKeyPress }`, `onChange = { handleChange }`, `onCreate = { handleCreate }`을 통해 상태를 전달하고 있습니다. 그리고 `TodoItemList`에게는 메서드를 통해 생성된 새로운 `todos`를 전달합니다. 이렇게 부모 컴포넌트를 통해 이 두 컴포넌트가 상호작용하고 있습니다.** 이제 `추가` 버튼을 누르거나, `Enter`키를 누르면 input값이 지워지는 것을 확인할 수 있습니다. 그리고 `todos` 배열이 새롭게 생성되겠죠. 새로운 배열을 다시 렌더링해주면 됩니다. 수정하기전에 `todos` 배열이 제대로 바뀌는지 확인하려면 크롬에서 `React 개발자 도구`를 설치한 뒤 확인하면 됩니다. `TodoItemList.js` 파일을 수정합니다.

```javascript
// components/TodoItemList.js

import React, {Component} from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component{
  render(){
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(
      ( {id, text, checked} ) => (
        <TodoItem
          id = { id }
          text = { text }
          checked = { checked }
          onToggle = { onToggle }
          onRemove = { onRemove }
          key = { id }
        />
      )
    )
    return(
      <div>
        { todoList }
      </div>
    );
  }
}

export default TodoItemList;
```

**추가버튼을 누르면 생기는 새로운 배열을 `map`을 통해 각각의 독립된 컴포넌트로 전환합니다.** 이 전환된 컴포넌트들(`todoList`)를 렌더링하면 추가버튼을 누를 때마다 이제 새로운 글이 올라오게 됩니다. 배열이 생성될 때, id값을 배열의 key값으로 두는 것이 좋습니다(지정해놓지 않으면 key값이 자동으로 주어집니다.).

## 체크박스

이제 체크버튼을 누르면 글자에 하프라인이 그려지는 것을 구현하겠습니다. 만들어 놓은 `onToggle` 메서드입니다. `App.js`에서 `handleToggle`메서드를 만든 뒤 state로 전달합니다.

```javascript
// App.js

import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 2
  state = {
    input: '',
    todos: [
      {id:0, text:'첫번째 할일', checked: false},
      {id:1, text:'두번째 할일', checked: true},
    ]
  }
  //값 변경
  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  //글 등록
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', //클릭과 동시에 input 비우기
      todos: todos.concat({ //클릭과 동시에 input이 추가된 배열 생성
        id: this.id++,
        text: input,
        checked: false,
      })
    })
  }
  //엔터키
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }
  //체크박스
  handleToggle = (id) => {
    const { todos } = this.state;
    // id로 todo 찾기
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    // 바뀐 배열 만들기
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos,
    })
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
    } = this;
    return (
    <TodoListTemplate form={(
      <Form
        value = { input }
        onKeyPress = { handleKeyPress }
        onChange = { handleChange }
        onCreate = { handleCreate }
      />
    )}>
      <TodoItemList todos = {todos} onToggle = {handleToggle}/>
    </TodoListTemplate>
    );
  }
}

export default App;
```



## 제거하기

제거 역시 onRemove 메서드를 정의하고 state를 전달하면 됩니다. 제거하는 작업도 state를 직접적으로 건들이면 안됩니다. 체크박스처럼 배열을 새롭게 만들어서 대입해야합니다.

```javascript
// App.js

import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 2
  state = {
    input: '',
    todos: [
      {id:0, text:'첫번째 할일', checked: false},
      {id:1, text:'두번째 할일', checked: true},
    ]
  }
  //값 변경
  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  //글 등록
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', //클릭과 동시에 input 비우기
      todos: todos.concat({ //클릭과 동시에 input이 추가된 배열 생성
        id: this.id++,
        text: input,
        checked: false,
      })
    })
  }
  //엔터키
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }
  //체크박스
  handleToggle = (id) => {
    const { todos } = this.state;
    // id로 todo 찾기
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    // 바뀐 배열 만들기
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos,
    })
  }
  //제거
  handleRemove = (id) => {
    const { todos } = this.state;
    // 바뀐배열 만들기(필터링)
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
    } = this;
    return (
    <TodoListTemplate form={(
      <Form
        value = { input }
        onKeyPress = { handleKeyPress }
        onChange = { handleChange }
        onCreate = { handleCreate }
      />
    )}>
      <TodoItemList todos = {todos} onToggle = {handleToggle} onRemove = {handleRemove}/>
    </TodoListTemplate>
    );
  }
}

export default App;
```







