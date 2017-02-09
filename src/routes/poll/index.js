import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import * as actions from '../../actions';
import Chart from './chart';
import Voting from './voting';

// REFRESH_TIME = time in milliseconds to refresh a poll
let REFRESH_TIME = null;

/**
 *  Poll class container
 *    -> Displays the entire individual poll's page
 */
class Poll extends Component {
  // Fetch the poll's information as soon as the page begins to load
  componentWillMount() {
    this.props.fetchSinglePoll(this.props.id);

    // Dynamically refresh vote totals ***
    if (REFRESH_TIME) {
      setInterval(() => {
        this.props.fetchSinglePoll(this.props.id);
      }, REFRESH_TIME)
    }
  }

  render() {
    const { poll } = this.props;

    if (!poll) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <Header as='h1'>{poll.question}</Header>
        <Header as='h3'>Created by: {poll.createdBy}</Header>
        <Chart data={poll.options} />
        <Voting
          data={poll.options}
          fetch={this.props.fetchSinglePoll}
          pollId={this.props.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    poll: state.polls.poll,
    id: ownProps.params.id
  };
};

export default connect(mapStateToProps, actions)(Poll);