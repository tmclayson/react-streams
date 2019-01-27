import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions'
import { Item } from 'semantic-ui-react'

class StreamEdit extends React.Component {
  // a user may arrive in our application using a direct route.
  // all components must be designed the operate independently, and not rely on having data
  // previously loaded by another component.
  // we need to immediately fetch the stream upon loading, as the redux store will not yet
  // have been initialised if the user refreshes the page (as one example)
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        <Item>
          <Item.Header>{ this.props.stream.title }</Item.Header>
        </Item>
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
  fetchStream
})(StreamEdit);

