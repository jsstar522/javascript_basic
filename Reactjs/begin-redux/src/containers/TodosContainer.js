import React, { Component } from 'react';
import Todos from 'components/Todos';
import { connect } from 'react-redux';
import { TodoActions } from 'store/actionCreators';


class TodosContainer extends Component {
  handleChange = (e) => {
    // 인풋 값 변경
    TodoActions.changeInput(e.target.value);
  }
  handleInsert = () => {
    // 목록추가
    const { input } = this.props;
    TodoActions.insert(input);
    // input값 다시 빈칸으로
    TodoActions.changeInput('');
  }
  handleToggle = (id) => {
    // 체크
    TodoActions.toggle(id);
  }
  handleRemove = (id) => {
    // 삭제
    TodoActions.remove(id);
  }

  render(){
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.props;
  
    return(
      <Todos
        input={input}
        todos={todos}
        onChange={handleChange}
        onInsert={handleInsert}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}

// 액션함수 바인딩
export default connect(
  ({ todo }) => ({
    input: todo.get('input'),
    todos: todo.get('todos')
  }),
)(TodosContainer);