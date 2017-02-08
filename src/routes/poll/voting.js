import React, { Component } from 'react';
import axios from 'axios';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.data[0].id};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:3010/api/options/${this.state.value}/vote`)
      .then(this.props.fetch(this.props.pollId))
      .catch(error => {
        console.log(error);
      });
  }

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
            {this.renderOptions()}
          </select>
        </label>
        <button className='pollSubmit' type='submit'>Submit</button>

      </form>
    );
  }
};

export default Voting;