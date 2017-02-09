import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Header, Segment } from 'semantic-ui-react';

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
      // Show a loading icon while the polls are being fetched
    } else {
      return <Segment>Loading</Segment>;
    }
  }

  render() {
    return (
      <div>
        <Header as='h2'>Polling Application</Header>
        <p>Recent Polls:</p>
        <Segment.Group>
          {this.renderPolls()}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homePolls: state.polls.homePolls
  };
};

export default connect(mapStateToProps, actions)(Home);