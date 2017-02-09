import React from 'react';
import { Divider, Input, Label } from 'semantic-ui-react';

const titleField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <Input {...input} size='large' type={type} placeholder='Enter a title for your poll...' />
    {touched && error && <Label basic color='red' pointing='left'>{error}</Label>}
    <Divider />
  </div>
);

export default titleField;