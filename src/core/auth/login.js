import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Input, Label } from 'semantic-ui-react';

import * as actions from '../../actions/authActions';

/**
 *  Include the error messages for the inputs
 */
const renderInput = field =>
  <div>
    <Input
      {...field.input}
      className='modal-input'
      type={field.type}
      placeholder={field.placeholder} />
    {field.meta.touched &&
      field.meta.error &&
      <Label basic color='red' pointing='left'>{field.meta.error}</Label>}
  </div>

/**
 *  Validate the form given a username and password
 */
const validate = formProps => {
  const errors = {};

  if (!formProps.username) {
    errors.username = "Please enter an username.";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
}

/**
 *  Container responsible for the Signin route
 */
class Login extends Component {
  componentWillMount() {
    // Clear any errors from previous pages
    this.props.authError(null);
  }

  // Submit the form and attempt to sign in the user
  handleFormSubmit({username, password}) {
    this.props.signInUser({ username, password });
  }

  // Show an error message to the user if there is a problem signing in
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <Field
            name="username"
            component={renderInput}
            placeholder="Enter your username" />
        </div>
        <div>
          <Field
            name="password"
            component={renderInput}
            type="password"
            placeholder="Enter your password" />
        </div>
        <br />
        <div className="container">
          {this.renderAlert()}
        </div>
        <Button primary action="submit">Submit</Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
}

// ReduxForm state
Login = reduxForm({
  form: 'signin',
  validate: validate
})(Login);

Login = connect(mapStateToProps, actions)(Login);

export default Login;