import _ from 'lodash';
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
// import { Item } from 'semantic-ui-react';

class StreamEdit extends React.Component {
  // a user may arrive in our application using a direct route.
  // all components must be designed the operate independently, and not rely on having data
  // previously loaded by another component.
  // we need to immediately fetch the stream upon loading, as the redux store will not yet
  // have been initialised if the user refreshes the page (as one example)
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  // the stream object has properties than match the name of the fields in the form, so we
  // can initialise the form in that way. However, if we do this, we also initialise the
  // userId and stream id, which are then resubmitted. This makes it seems like these
  // have also been updated. This is misleading however.
  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div css={ { width: '80%', margin: 'auto' } }>
        <h3>Edit a Stream</h3>
        <StreamForm initialValues={ _.pick(this.props.stream, 'title', 'description') } onSubmit={ this.onSubmit } />
      </div>
    )
  }
}

// ownProps is a reference to the props object in the connected component
const mapStateToProps = (state, ownProps) => {
  // the redux store is set up as an object, where the key is the id of the stream,
  // and value is the stream object (which also again includes the id)
  // console.log(state.streams[ownProps.match.params.id]);
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);

