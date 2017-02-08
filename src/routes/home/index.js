import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Container, Header, Segment } from 'semantic-ui-react';

import * as actions from '../../actions';

class Home extends Component {
  componentWillMount() {
    this.props.fetchHomePolls();
  }

  renderPolls() {
    const { homePolls } = this.props;
    if (homePolls) {
      return homePolls.map(item => {
        return (
          <Link key={item.id} to={`/poll/${item.id}`}>
            <Segment >
              {item.question}
            </Segment>
          </Link>
        );
      });
    } else {
      return <Segment>Loading</Segment>;
    }
  }

  render() {
    return (
      <Container text className='ui center aligned'>
        <Header as='h2'>Polling Application</Header>
        <p>Recent Polls:</p>
        <Segment.Group>
          {this.renderPolls()}
        </Segment.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    homePolls: state.polls.homePolls
  };
};

export default connect(mapStateToProps, actions)(Home);