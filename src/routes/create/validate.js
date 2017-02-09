const validate = values => {
  const errors = {};

  if (!values.pollName) {
    errors.pollName = 'Required';
  }

  if (!values.default1) {
    errors.default1 = 'Required';
  }

  if (!values.default2) {
    errors.default2 = 'Required';
  }

  //   if (!values.options || !values.options.length) {
  //     errors.options = { _error: 'At least one option must be entered' }
  //   } else {
  //     const optionsArrayErrors = []
  //     values.options.forEach((option, optionIndex) => {
  //       const optionErrors = {}
  //       if (!option) {
  //         optionErrors.title = 'Required'
  //         optionsArrayErrors[optionIndex] = optionErrors
  //       }
  //     })
  //   if (optionsArrayErrors.length) {
  //     errors.options = optionsArrayErrors
  //   }
  // }
  return errors;
};

export default validate;