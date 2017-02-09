import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import titleField from './titleField';
import Options from './options';
import validate from './validate';
import * as actions from '../../actions';

class Create extends Component {
  // Submit the form and attempt to sign the user up
  handleFormSubmit(formProps) {
    //this.props.signUpUser(formProps);
    console.log(formProps);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="pollName" type="text" component={titleField} label="Poll Title" />
        <FieldArray name="options" component={Options} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.polls.error
  };
};

// ReduxForm state
Create = reduxForm({
  form: 'fieldArrays',
  validate: validate
})(Create);

export default connect(mapStateToProps, actions)(Create);