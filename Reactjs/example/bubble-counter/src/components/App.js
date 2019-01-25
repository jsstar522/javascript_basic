import React, { Component } from 'react';
import Counter from './Counter';
import CounterContainer from '../containers/CounterContainer';

class App extends Component {
  render() {
    return(
      <div>
        <CounterContainer />
      </div>
    );
  }
}

export default App;