import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react';

import * as actions from '../../actions';

/**
 *  Home class container
 *    -> Displays the home page (a list of polls)
 */
class Home extends Component {
  // Fetch the polls to show on load
  componentWillMount() {
    this.props.fetchHomePolls();
  }

  // Show a create poll button if the user is authenticated
  renderCreateButton() {
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <Link key='1' to={'/create'}>
          <Button primary>Create Poll<Icon className='header-icon' name='add' /></Button>
        </Link>
      );
    // Prompt the user to log in or register if they aren't authenticated
    } else {
      return (
        <p>To create a poll, please log in or register!</p>
      );
    }
  }

  // Render the polls from the server
  renderPolls() {
    const { homePolls } = this.props;

    if (homePolls) {
      // Create a linked segment to each of the poll's individual pages to show
      return homePolls.map(item => {
        return (
          <Link key={item.id} to={`/poll/${item.id}`}>
            <Segment >
              {item.question}
            </Segment>
          </Link>
        );
      });
      // Show a loading message while the polls are being fetched
    } else {
      return <Segment>Loading</Segment>;
    }
  }

  render() {
    return (
      <div>
        <Header as='h1'>react_Poll<Icon className='header-icon' name='checkmark box' /></Header>
        <Header as='h3'>Create simple and dynamic polls to use and share instantly!</Header>
        {this.renderCreateButton()}
        <Divider />
        <strong>Recent Polls:</strong>
        <Segment.Group>
          {this.renderPolls()}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    homePolls: state.polls.homePolls
  };
};

export default connect(mapStateToProps, actions)(Home);