import React from 'react';
import CustomModal from '../CustomModal';
import { Button } from 'semantic-ui-react'
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
// import styles from './StreamStyles';
// import PropTypes from 'prop-types'

class StreamDelete extends React.Component {

  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  }
  // could also have just added an onClick() handler to the cancel button
  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <Link to="/">
          <Button
            negative
            content='No'
          />
        </Link>
        <Button
          onClick={ () => this.props.deleteStream(id) }
          positive
          labelPosition='right'
          icon='checkmark'
          content='Yes'
        />

      </>
    );
  }

  // the modal will first mount, and only then, call componentDidMount, so there
  // will be a short delay before the title of the stream is available.
  renderContent() {
    if (!this.props.stream) {
      return `Are you sure you want to delete this stream?`;
    }

    return `Are you sure you want to delete the stream with title '${ this.props.stream.title }'?`;

  }
  render() {
    return (
      <CustomModal
        title="Delete Stream"
        content={ this.renderContent() }
        actions={ this.renderActions() }
        onClose={ () => history.push('/') }
      />
    );
  }
}
// ownProps gives the function access to the component props.
// from which we can pull out the stream id needed.
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

// StreamDelete.propTypes = {

// }
export default connect(mapStateToProps, {
  fetchStream,
  deleteStream
})(StreamDelete);

