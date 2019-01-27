import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Field, reduxForm } from 'redux-form'; // Field is a Component, reduxForm function similarly to connect
// import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react';

class StreamForm extends React.Component {
  // destructure out input from the formProps
  // renderInput is passed to another component, so we cannot be certain of the context of 'this'
  // so we use an arrow function to bind it to the StreamForm class.
  renderInput = ({ input, label, meta }) => {
    // by adding the error class conditionally to the form it will also display in red
    // to make it verx clear to the user what is wrong.
    const className = `field ${ meta.error && meta.touched ? 'error' : '' }`
    // formProps are passed by the Field component.
    // console.log(formProps);
    // spread syntax adds the key/value pairs from formProps.input to the jsx input element
    return (
      <div className={ className }>
        <label>{ label }</label>
        <input { ...input } autoComplete="off" />
        { this.renderError(meta) }
      </div>
    );
  }
  // touched is a boolean on the meta object that is set to true once a user has clicked into and then out of an input
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Message error>
          <Message.Header>{ error }</Message.Header>
        </Message>
      )
    }
  }
  // formValues contains all the data input by the form
  onSubmit = (formValues) => {
    // recieve form data and call redux action creator
    this.props.onSubmit(formValues);
  }

  render() {
    // handleSubmit will automatically recieve the event
    // need to add the "error" class to the form  due to semantic ui hiding messages inside forms by default.
    return (
      <div>
        <Form className="error" css={ { width: '80%', margin: 'auto' } } onSubmit={ this.props.handleSubmit(this.onSubmit) }>
          <Form.Field>
            <Field name="title" component={ this.renderInput } label="Enter Title" />
          </Form.Field>
          <Form.Field>
            <Field name="description" component={ this.renderInput } label="Enter Description" />
          </Form.Field>
          <Button primary>Submit</Button>
        </Form>
      </div >
    );
  }
}
// if a field has the same name as a property of the object returned, then the field components will be re-rendered
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You need to enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You need to enter a description.';
  }
  return errors;
}

// StreamForm.propTypes = {

// }
// reduxForm returns a function and we immediately call that function with StreamForm
// After connecting the component like this StreamForm now has additional props
export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
