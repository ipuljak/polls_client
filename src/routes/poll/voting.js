import React, { Component } from 'react';
import axios from 'axios';

/**
 *  Voting class component
 *    -> Displays a poll's options and the ability to vote
 */
class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = { value: undefined };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Set the state to be the selected poll option
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Handle when the option is submitted
  handleSubmit(event) {
    // Prevent the page from reloading
    event.preventDefault();
    // Make sure an option has been chosen and isn't the placeholder
    if (this.state.value && this.state.value !== '---') {
      // Submit the vote to the server and refresh the poll
      axios.get(`http://localhost:3010/api/options/${this.state.value}/vote`)
        // If the vote is successful, refresh the chart to update the vote
        .then(response => {
          if (response.data.success) {
            // Give a small timeout to the refresh to sync with the database
            setTimeout(() => {
              this.props.fetch(this.props.pollId);
            }, 150);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Display the different options for the poll
  renderOptions() {
    return this.props.data.map(item => {
      return <option key={item.id} value={item.id}>{item.option}</option>;
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Select your option:</p>
          <select value={this.state.value} onChange={this.handleChange}>
            <option>---</option>
            {this.renderOptions()}
          </select>
        </label>
        <button className='pollSubmit' type='submit'>Submit</button>
      </form>
    );
  }
};

export default Voting;