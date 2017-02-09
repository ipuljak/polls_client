import React, { Component } from 'react';
import { connect } from 'react-redux';

class Create extends Component {
  render() {
    const { authenticated } = this.props;

    if (!authenticated) {
      return (
        <h1>Please log in or register to create polls!</h1>
      );
    }

    return (
      <h1>You can create polls!</h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, null)(Create);