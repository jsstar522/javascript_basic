import React, { Component } from 'react';

class stateExample extends Component {
  constructor(props){
    super(props);

    this.state = {
      header: "Header initial state",
      content: "Content initial state",
    };
  }

  updateHeader(text){
    this.setState({
      header: "Header is changed",
    });
  }

  render(){
    return(
      <div>
        <h1>{this.state.header}</h1>
        <h2>{this.state.content}</h2>
        <button onClick={this.updateHeader.bind(this)}>Update</button>
      </div>
    );
  }
}

export default stateExample;