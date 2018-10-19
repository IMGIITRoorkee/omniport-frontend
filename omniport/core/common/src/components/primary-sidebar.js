import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Icon, Menu, Popup } from 'semantic-ui-react'
import { isBrowser, isMobile } from 'react-device-detect'

import '../css/primary-sidebar.css'

class PrimarySidebar extends React.Component {
  state = {
    sideBarMenuItems: [
      {
        icon: 'newspaper',
        name: 'Feed',
        path: '/'
      },
      {
        icon: 'calendar alternate outline',
        name: 'Events',
        path: '/events'
      },
      {
        icon: 'cubes',
        name: 'Apps',
        path: '/apps'
      },
      {
        icon: 'group',
        name: 'Groups',
        path: '/groups'
      },
      {
        icon: 'chain',
        name: 'Links',
        path: '/links'
      },
      {
        icon: 'setting',
        name: 'Settings',
        path: '/settings'
      },
      {
        icon: 'question',
        name: 'Helpcentre',
        path: '/helpcentre'
      }
    ]
  }

  getSideBarMenuItems = () => {
    const { sideBarMenuItems } = this.state
    return sideBarMenuItems.map((item, index) => {
      return (
        <Popup
          key={index}
          trigger={
            <Menu.Item as={NavLink} exact to={item.path} name={item.name}>
              <Icon name={item.icon} size='large' />
            </Menu.Item>
          }
          content={item.name}
          position={isMobile ? 'bottom center' : 'right center'}
        />
      )
    })
  }

  render () {
    const themeColor = localStorage.getItem('themeColor') || 'blue'

    return (
      <Menu
        icon
        attached
        inverted
        vertical={!isMobile}
        color={themeColor}
        styleName='primary-sidebar'
      >
        {this.getSideBarMenuItems()}
      </Menu>
    )
  }
}

PrimarySidebar.propTypes = {
  themeColor: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object
}

export default PrimarySidebar
