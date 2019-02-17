import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import { connect } from 'react-redux';

import ViewSelectorContainer from './containers/ViewSelectorContainer';
import InputContainer from './containers/InputContainer';
import ContactModalContainer from './containers/ContactModalContainer';
import FloatingButtonContainer from './containers/FloatingButtonContainer';
import ContactListContainer from './containers/ContactListContainer';
import FavoriteListContainer from './containers/FavoriteListContainer';

class App extends Component {
  render() {
    const { view } = this.props;
    return(
      <div>
        <Header/>
        <ViewSelectorContainer/>
        <Container visible={view==='favorite'}>
          <FavoriteListContainer/>
        </Container>
        <Container visible={view==='list'}>
          <InputContainer/>
          <ContactListContainer/>
        </Container>
        <ContactModalContainer/>
        <FloatingButtonContainer/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    view: state.base.get('view')
  })
)(App);