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
