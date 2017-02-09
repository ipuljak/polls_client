import React from 'react';
import { Input, Label } from 'semantic-ui-react';

// The Input field for options on the create poll page
const optionField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <Input {...input} size='small' type={type} label={label} placeholder='Enter an option...' />
    {touched && error && <Label basic color='red' pointing='left'>{error}</Label>}
  </div>
);

export default optionField;