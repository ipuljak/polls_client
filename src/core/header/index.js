import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Menu, Modal } from 'semantic-ui-react';

import * as actions from '../../actions/authActions';
import Login from '../auth/login';
import Register from '../auth/register';

/**
 *  AppHeader class container
 *    -> Displays the header and it's options
 */
class AppHeader extends Component {
  state = { activeItem: 'home' };

  // Set the active header item when clicked
  handleItemClick = (e, {name}) => {
    this.setState({ activeItem: name });
  }

  renderLinks() {
    const { activeItem } = this.state;
    const { authenticated, signOutUser } = this.props;
    // If the user is authenticated, only show the sign out menu item
    if (authenticated) {
      return (
        <div className='nav-links'>
          <Menu.Item 
            as={Link} 
            to='/create' 
            name='Create' 
            active={activeItem === 'Create'} 
            onClick={this.handleItemClick}>
            Create Poll
            <Icon className='header-icon' name='add' />
          </Menu.Item>
          <Menu.Item 
            name='Sign Out' 
            onClick={() => signOutUser()}>
            Sign Out
            <Icon className='header-icon' name='sign out' />
          </Menu.Item>
        </div>
      );
      // Otherwise show the login and register menu items
    } else {
      return (
        <div className='nav-links'>
          <Modal trigger={<Menu.Item name='Login'>Login<Icon className='header-icon' name='sign in' /></Menu.Item>}>
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Login />
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Modal trigger={<Menu.Item name='Register'>Register<Icon className='header-icon' name='add user' /></Menu.Item>}>
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
        <Menu.Item 
          as={Link} 
          to='/' 
          name='Home' 
          active={activeItem === 'Home'} 
          onClick={this.handleItemClick}>
          react_Poll
          <Icon className='header-icon' name='checkmark box' />
        </Menu.Item>
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