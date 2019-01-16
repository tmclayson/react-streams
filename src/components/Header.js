import React from 'react'
import { Menu } from 'semantic-ui-react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth'
function Header(props) {
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item>
          <Link to="/">
            Streamer
          </Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to="/">
              All Streams
            </Link>
          </Menu.Item>
          <GoogleAuth />
        </Menu.Menu>
      </Menu>
    </>
  )
}

// Header.propTypes = {

// }

export default Header

