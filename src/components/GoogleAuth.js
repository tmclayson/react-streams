import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react';
// google tries to keep this library as small as possible, so the actual functions we require
// need to be loaded in a follow up request.
// the scope property is a list of the resources/data we want access to.
export default class GoogleAuth extends Component {
  // we don't know initially whether the user is signed in or not.
  state = { isSignedIn: null };

  componentDidMount = () => {
    window.gapi.load('client:auth2', () => {
      // returns a promise
      window.gapi.client.init({
        clientId: '107163424326-vb1ge7af81kmsl8ujap7721nlfanc96b.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  // these helper methods aren't strictly necessary, but can make the code clearer
  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }


  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return (
        null
      );
    } else if (this.state.isSignedIn) {
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
      <div>
        { this.renderAuthButton() }
      </div>
    )
  }
}
