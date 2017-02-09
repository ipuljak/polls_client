// Validation function for the poll title and option fields
const validate = values => {
  const errors = {};

  // Make sure there is a poll name
  if (!values.pollName) {
    errors.pollName = 'Required';
  }

  // Make sure there is a first option
  if (!values.default1) {
    errors.default1 = 'Required';
  }

  // Make sure there is a second option
  if (!values.default2) {
    errors.default2 = 'Required';
  }

  return errors;
};

export default validate;