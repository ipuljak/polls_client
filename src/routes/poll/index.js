import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import * as actions from '../../actions';
import Chart from './chart';
import Voting from './voting';

/**
 *  Poll class container
 *    -> Displays the entire individual poll's page
 */
class Poll extends Component {
  // Fetch the poll's information as soon as the page begins to load
  componentWillMount() {
    this.props.fetchSinglePoll(this.props.id);

    // *** Set an interval here to dynamically refresh vote totals ***
    // setInterval(() => {
    //   this.props.fetchSinglePoll(this.props.id);
    // }, 5000)
  }

  render() {
    const { poll } = this.props;

    if (!poll) {
      return <h1>Loading...</h1>
    }

    return (
      <Container text className='ui center aligned'>
        <Header as='h1'>{poll.question}</Header>
        <Header as='h3'>Created by: {poll.createdBy}</Header>
        <Chart data={poll.options} />
        <Voting
          data={poll.options}
          fetch={this.props.fetchSinglePoll}
          pollId={this.props.id} />
      </Container>
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