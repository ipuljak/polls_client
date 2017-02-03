import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, {name}) => {
    this.setState({ activeItem: name });
  }

  render() {
    const {activeItem} = this.state;

    return (
      <Menu inverted>
        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/secret' name='Secret' active={activeItem === 'Secret'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item name='Sign In' active={activeItem === 'Sign In'} onClick={this.handleItemClick} />
          <Menu.Item name='Sign Up' active={activeItem === 'Sign Up'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;