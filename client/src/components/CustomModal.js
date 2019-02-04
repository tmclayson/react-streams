import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'semantic-ui-react';
// import PropTypes from 'prop-types'

// class CustomModal extends React.Component {
const CustomModal = props => {
  // if we were to provide a reference to the body directly then the modal
  // would replace the entire content of it when it appeared
  // instead, create an extra sibling element to body on index.html and connect the modal to that.
  // state = { open: true }

  // closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
  //   this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  // }

  // close = () => {
  // this.setState({ open: false });
  //   history.push('/');
  // }
  // < Button onClick = { this.closeConfigShow(false, true) } > No Close on Escape</Button>
  // render() {
  //   const { open, closeOnEscape, closeOnDimmerClick } = this.state
  // need the onClose functionality to be in an arrowfunction, otherwise it is called immediately upon creation
  return ReactDOM.createPortal(
    <>
      <Modal
        open={ true }
        closeOnEscape={ true }
        onClose={ props.onClose }>
        <Modal.Header>{ props.title }</Modal.Header>
        <Modal.Content>
          <p>{ props.content }</p>
        </Modal.Content>
        <Modal.Actions>
          { props.actions }
        </Modal.Actions>
      </Modal>
    </>,
    document.querySelector('#modal')
  );
  // }

}

// Modal.propTypes = {

// }

export default CustomModal
