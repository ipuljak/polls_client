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

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation.";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = "Passwords must match!";
  }

  return errors;
}

/**
 *  Container Register responsible for the Signout route
 */
class Register extends Component {
  componentWillMount() {
    // Clear any authentication errors from previous pages
    this.props.authError(null);
  }

  // Submit the form and attempt to sign the user up
  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps);
  }

  // Render an alert if there's a problem
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
            placeholder="Enter your desired username" />
        </div>
        <div>
          <Field
            name="password"
            component={renderInput}
            type="password"
            placeholder="Enter a password" />
        </div>
        <div>
          <Field
            name="passwordConfirm"
            component={renderInput}
            type="password"
            placeholder="Confirm your password" />
        </div>
        <br />
        {this.renderAlert()}
        <Button primary type="submit">Submit</Button>
        <br />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

// ReduxForm state
Register = reduxForm({
  form: 'signup',
  validate: validate
})(Register);

Register = connect(mapStateToProps, actions)(Register);

export default Register;