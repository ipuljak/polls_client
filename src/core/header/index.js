import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Modal } from 'semantic-ui-react';
import { Link } from 'react-router';

import * as actions from '../../actions/authActions';
import Login from '../auth/login';
import Register from '../auth/register';

class AppHeader extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, {name}) => {
    this.setState({ activeItem: name });
  }

  renderLinks() {
    const { authenticated, signOutUser } = this.props;
    // If the user is authenticated, only show the sign out menu item
    if (authenticated) {
      return (
        <Menu.Item name='Sign Out' onClick={() => signOutUser()}>Sign Out</Menu.Item>
      );
      // Otherwise show the login and register menu items
    } else {
      return (
        <div className='nav-links'>
          <Modal trigger={<Menu.Item name='Login'>Login</Menu.Item>}>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Login />
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Modal trigger={<Menu.Item name='Register'>Register</Menu.Item>}>
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Register />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      );
    }
  }

  render() {
    const {activeItem} = this.state;

    return (
      <Menu inverted>
        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/secret' name='Secret' active={activeItem === 'Secret'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          {this.renderLinks()}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(AppHeader);