const validate = values => {
  const errors = {}
  if (!values.clubName) {
    errors.clubName = 'Required'
  }
  if (!values.options || !values.options.length) {
    errors.options = { _error: 'At least one option must be entered' }
  } else {
    const optionsArrayErrors = []
    values.options.forEach((option, optionIndex) => {
      const optionErrors = {}
      if (!option || !option.title) {
        optionErrors.title = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
    })
  if (optionsArrayErrors.length) {
    errors.options = optionsArrayErrors
  }
}
return errors
}

export default validate