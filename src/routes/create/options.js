import React from 'react';
import { Field } from 'redux-form';
import { List } from 'semantic-ui-react';

import optionField from './optionField';

const Options = ({ fields, meta: { touched, error } }) => (
  <List>
    {fields.map((option, index) =>
      <List.Item key={index}>
        <button
          type="button"
          title="Remove Option"
          onClick={() => fields.remove(index)}>Remove Option</button>
        <h4>Option #{index + 1}</h4>
        <Field
          name={`${option}.title`}
          type="text"
          component={optionField}
          label="Option" />
      </List.Item>
    )}
    <List.Item>
      <button type="button" onClick={() => fields.push({})}>Add Option</button>
      {touched && error && <span>{error}</span>}
    </List.Item>
  </List>
);

export default Options;