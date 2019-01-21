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
    ],
    keyword: '',
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
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
    const filteredList = this.state.information.filter(info => info.name.indexOf(this.state.keyword) !== -1);
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        {JSON.stringify(this.state.information)}
        <p>
          <input 
            placeholder="검색 할 이름을 입력하세요.." 
            onChange={this.handleChange}
            value={this.state.keyword}
          />
        </p>
        <hr />
        <PhoneInfoList 
          data = {filteredList} 
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
