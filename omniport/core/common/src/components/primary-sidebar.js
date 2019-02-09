import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu, Popup } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'

import { getTheme, getThemeObject } from 'formula_one'
import config from 'core/src/configs/primarySidebarConfigs.json'

import '../css/primary-sidebar.css'

class PrimarySidebar extends React.Component {
  state = {
    sideBarMenuItems: config['services']
  }

  getSideBarMenuItems = () => {
    const { sideBarMenuItems } = this.state
    return sideBarMenuItems.map((item, index) => {
      return isMobile ? (
        <Menu.Item
          as={NavLink}
          to={item.path}
          name={item.name}
          id='menuPrimarySidebar'
        >
          <Icon name={item.icon} size='large' />
        </Menu.Item>
      ) : (
        <Popup
          key={index}
          trigger={
            <Menu.Item
              as={NavLink}
              to={item.path}
              name={item.name}
              id='menuPrimarySidebar'
            >
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
    return (
      <Menu
        icon
        attached
        inverted
        vertical={!isMobile}
        color={getTheme()}
        styleName='primary-sidebar'
      >
        <style>
          {/* Semantic UI classes use !important and React considers inline
            !important as bad practice */}
          {`#menuPrimarySidebar.active {
                color: ${getThemeObject().hexCode} !important;
                background-color: #fff !important;
                border-radius: 0;
              }
            `}
        </style>
        {this.getSideBarMenuItems()}
      </Menu>
    )
  }
}

export default PrimarySidebar
