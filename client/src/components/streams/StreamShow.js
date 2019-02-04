import { Component } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import styles from './StreamStyles';

export class StreamShow extends Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  }

  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream;
    return (
      <div css={ styles.container }>
        <h1>{ title }</h1>
        <h5>{ description }</h5>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps, {
  fetchStream
})(StreamShow);

