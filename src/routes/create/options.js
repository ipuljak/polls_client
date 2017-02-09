import React from 'react';
import { Field } from 'redux-form';
import { Button, Divider, List } from 'semantic-ui-react';

import optionField from './optionField';

const Options = ({ fields, meta: { touched, error } }) => (
  <List>
    {fields.map((option, index) =>
      <List.Item key={index}>
        <Field
          name={`${option}.title`}
          label={`Option #${index + 1}`}
          type='text'
          component={optionField} />
          <Button 
            basic 
            color='red'
            title='Remove Option'
            onClick={() => fields.remove(index)}>X</Button>
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