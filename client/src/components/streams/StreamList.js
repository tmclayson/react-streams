import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, List, Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
  // arrow function binds this to component instance
  componentDidMount = () => {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <Item.Content>

          <Link to={ `streams/delete/${ stream.id }` }>
            <Button negative floated='right' css={ { marginLeft: '0.5em !important' } }>Delete</Button>
          </Link>

          <Link to={ `streams/edit/${ stream.id }` }>
            <Button primary floated='right'>Edit</Button>
          </Link>

        </Item.Content>
      );
    }
  }

  renderList() {
    // Have to call the renderAdmin() before the rest of the content in order for the buttons to
    // appear on the same line.
    return this.props.streams.map(stream => {
      return (
        <Item key={ stream.id } verticalAlign='middle'>
          { this.renderAdmin(stream) }
          <Icon name="camera" size="large" />
          <Item.Content>
            { stream.title }
            <Item.Description>
              { stream.description }
            </Item.Description>
          </Item.Content>

        </Item>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div css={ { textAlign: 'right' } }>
          <Link to="/streams/new">
            <Button primary>
              Create Stream
            </Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div css={ { width: '80%', margin: 'auto' } }>
        <h2>
          Streams
        </h2>
        <List celled >
          { this.renderList() }
        </List>
        { this.renderCreate() }
      </div >
    );
  }
}


const mapStateToProps = (state) => {
  // we normally vonvert the object to an array to make it easier to map over in the component
  // lodash provides an object map function, but we can instead use the built in javascript function,
  // Object.values(), which extract each value from an object and puts them into an array
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

// StreamList.propTypes = {

// }
// Calling the connect() function returns a higher-order component which can be used to wrap any React component.
// Since a higher-order component is returned by connect(), it has to be invoked again with the base React
//component in order to convert it to a container component:
export default connect(mapStateToProps, { fetchStreams })(StreamList)

