import { Component } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'
// google tries to keep this library as small as possible, so the actual functions we require
// need to be loaded in a follow up request.
// the scope property is a list of the resources/data we want access to.
class GoogleAuth extends Component {
  // we don't know initially whether the user is signed in or not.
  // state = { isSignedIn: null };

  componentDidMount = () => {
    window.gapi.load('client:auth2', () => {
      // returns a promise
      window.gapi.client.init({
        clientId: '107163424326-vb1ge7af81kmsl8ujap7721nlfanc96b.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // updates the authentication status in the redux store
        this.onAuthChange(this.auth.isSignedIn.get());
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        // listen() passes true to the function passed as a listener when the user signs in, and false when the user signs out.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    // calls the action creators
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  // these helper methods aren't strictly necessary, but can make the code clearer
  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }


  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        null
      );
    } else if (this.props.isSignedIn) {
      return (
        <Button color='red' onClick={ this.onSignOutClick }>
          <Icon name='google' /> Sign Out
        </Button>
      );
    } else {
      return (
        <Button color='green' onClick={ this.onSignInClick }>
          <Icon name='google' /> Sign In
        </Button>
      );
    }
  }

  render() {
    return (
      <div css={ { paddingTop: '3px' } }>
        { this.renderAuthButton() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};


export default connect(mapStateToProps, {
  signIn,
  signOut
})(GoogleAuth)