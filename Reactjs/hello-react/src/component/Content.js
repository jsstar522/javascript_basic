import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import '../App.css';

class Content extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.body}</p>
        
      </div>
    )
  }
}

Content.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
};

export default Content;