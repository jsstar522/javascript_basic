import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import { connect } from 'react-redux';

import ViewSelectorContainer from './containers/ViewSelectorContainer';


class App extends Component {
  render() {
    const { view } = this.props;
    return(
      <div>
        <Header />
        <ViewSelectorContainer/>
        <Container visible={view==='favorite'}>
        /* FavoriteListContainer 가 들어갈 자리 */
        </Container>
        <Container visible={view==='list'}>
        /* InputContainer(검색) 가 들어갈 자리 */
        /* ContactListContainer 가 들어갈 자리 */
        </Container>
        /* ContactModalContainer 가 들어갈 자리 */
        /* FloatingButtonContainer 가 들어갈 자리 */
      </div>
    );
  }
}

export default connect(
  (state) => ({
    view: state.base.get('view')
  })
)(App);