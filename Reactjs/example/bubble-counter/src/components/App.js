import React, { Component } from 'react';
import CounterListContainer from '../containers/CounterListContainer';
import Buttons from '../components/Buttons';

import { connect } from 'react-redux';
import * as actions from '../modules';

import { getRandomColor } from '../utils';

class App extends Component {
  render() {
    const { onCreate, onRemove } = this.props;
    return(      
      <div className = "App">
        <Buttons
          onCreate={onCreate}
          onRemove={onRemove}
        />
        <CounterListContainer />
      </div>
    );
  }
}

// button 액션함수
const mapToDispatch = (dispatch) => ({
  onCreate: () => dispatch(actions.create(getRandomColor())),
  onRemove: (index) => dispatch(actions.remove(index))
});

// 리덕스에 연결
export default connect(null, mapToDispatch)(App);
