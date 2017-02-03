import React, { Component } from 'react';
import { connect } from 'react-redux';

class Secret extends Component {
  render() {
    const {authenticated} = this.props;
    if (authenticated) {
      return (
        <h1>You found me!</h1>
      );
    } else {
      return (
        <h1>You are not authenticated!</h1>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, null)(Secret);