import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { Button, List } from 'semantic-ui-react';
import axios from 'axios';

import titleField from './titleField';
import optionField from './optionField';
import Options from './options';
import validate from './validate';
import * as actions from '../../actions';

const ROOT_URL = 'http://localhost:3010/api';

class Create extends Component {
  // Submit the form and attempt to sign the user up
  handleFormSubmit(formProps) {
    const { createError, userId } = this.props;
    // Merge the options together
    let data = {};
    data.options = [];
    data.question = formProps.pollName;
    data.options.push(formProps.default1, formProps.default2);

    // Check if any non-mandatory options exist
    if (formProps.options) {
      formProps.options.forEach(item => {
        if (item.title) {
          data.options.push(item.title);
        }
      });
    }

    // Create the poll and options
    axios.post(`${ROOT_URL}/polls/create`, {
      question: data.question,
      UserId: userId
    })
      .then(pollResponse => {
        const id = pollResponse.data.id;
        // Create an instance on the server for each option
        data.options.forEach(item => {
          axios.post(`${ROOT_URL}/options/create`, {
            option: item,
            PollId: id
          })
            .catch(error => {
              createError(error);
            });
        });
        // Give a small timeout to the refresh to sync with the database
        setTimeout(() => {
          // Redirect the user to the newly created poll page
          browserHistory.push(`/poll/${id}`);
        }, 150);
      })
      .catch(error => {
        createError(error);
      });
  }

  render() {
    const { authenticated, handleSubmit, pristine, reset, submitting } = this.props;

    if (!authenticated) {
      return (
        <h1 className='generic-error'>Please log in or register to create polls!</h1>
      );
    }

    return (
      <div>
        <h1>Create a Poll</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="pollName" type="text" component={titleField} label="Poll Title" />
          <List>
            <List.Item key='1'>
              <Field
                name='default1'
                label={`#1`}
                type='text'
                component={optionField} />
            </List.Item>
            <List.Item key='2'>
              <Field
                name='default2'
                label={`#2`}
                type='text'
                component={optionField} />
            </List.Item>
          </List>
          <FieldArray name="options" component={Options} />
          <Button.Group>>
          <Button positive type="submit" disabled={submitting}>Submit</Button>
            <Button.Or />
            <Button negative type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button>
          </Button.Group>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    userId: state.auth.username,
    errorMessage: state.polls.error
  };
};

// ReduxForm state
Create = reduxForm({
  form: 'fieldArrays',
  validate: validate
})(Create);

export default connect(mapStateToProps, actions)(Create);