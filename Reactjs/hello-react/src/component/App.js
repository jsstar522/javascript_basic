import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Counter from './Counter';

class App extends Component {
  render() {
    return (
      <div>
        <Header title={this.props.headerTitle}/>
        <Content title={this.props.contentTitle} body={this.props.contentBody}/>
        <Counter />
      </div>
    );
  }
}

App.defaultProps = {
  headerTitle: "Jongseok's React",
  contentTitle: "content title props",
  contentBody : "content body props",
};

export default App;
