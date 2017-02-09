import React from 'react';
import { Input, Label } from 'semantic-ui-react';

const optionField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <Input {...input} size='small' type={type} placeholder={label} />
      {touched && error && <Label basic color='red' pointing='left'>{error}</Label>}
    </div>
  </div>
);

export default optionField;