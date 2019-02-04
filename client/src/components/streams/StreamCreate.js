import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
import styles from './StreamStyles';
// import { Form, Button, Message } from 'semantic-ui-react';

class StreamCreate extends React.Component {
  // formValues contains all the data input by the form
  onSubmit = (formValues) => {
    // recieve form data and call redux action creator
    this.props.createStream(formValues);
  }

  render() {
    // handleSubmit will automatically recieve the event
    // need to add the "error" class to the form  due to semantic ui hiding messages inside forms by default.
    return (
      <div css={ styles.container }>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={ this.onSubmit } />
      </div >
    );
  }
}

export default connect(null, { createStream })(StreamCreate);