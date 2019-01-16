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
