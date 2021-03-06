import React from 'react';
import { Field } from 'redux-form';
import { Button, Divider, List } from 'semantic-ui-react';

import optionField from './optionField';

// The full fields for the optional options array on the create poll page
const Options = ({ fields, meta: { touched, error } }) => (
  <List>
    {fields.map((option, index) =>
      <List.Item key={index}>
        <Field
          name={`${option}.title`}
          label={`#${index + 3}`}
          type='text'
          component={optionField} />

      </List.Item>
    )}
    <List.Item>
      <Divider />
      <Button type="button" onClick={() => fields.push({})}>Add Option</Button>
      {touched && error && <span>{error}</span>}
    </List.Item>
  </List>
);

export default Options;