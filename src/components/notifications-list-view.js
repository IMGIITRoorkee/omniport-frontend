import React from 'react'
import axios from 'axios'
import path from 'path'
import { Link } from 'react-router-dom'
import { Dropdown, Header, Image, Icon } from 'semantic-ui-react'

import { getThemeObject } from 'formula_one'
import {
  urlUserNotifications,
  urlAllNotifications,
  urlDefaultNotificationIcon
} from '../urls'
import '../css/inline.css'

class NotificationsListView extends React.Component {
  state = {
    notifications: [],
    count: 0
  }
  getNotifications = () => {
    axios
      .get(urlUserNotifications())
      .then(res => {
        this.setState({
          notifications: res.data['results'],
          count: res.data['count']
        })
      })
      .catch(err => {
        // TODO: Remove console.log, use error handlers
      })
  }

  componentDidMount () {
    this.getNotifications()
  }

  render () {
    const unreadStyle = {
      backgroundColor: getThemeObject().hexCode + '07' // Opacity
    }
    return (
      <>
        {this.state.count ? (
          this.state.notifications.map((notification, index) => {
            const app = notification.category.appInfo
            return (
              <Dropdown.Item
                key={index}
                as={Link}
                to={path.join('/', notification.webOnclickUrl)}
                styleName='width-80vw max-width-500px'
                style={notification && notification.unread ? unreadStyle : {}}
                content={
                  <Header size={'small'}>
                    <Image
                      size='mini'
                      src={`${
                        app.assets
                          ? `/static/${app.baseUrls.static}${app.assets.logo}`
                          : urlDefaultNotificationIcon()
                      }`}
                    />
                    <Header.Content styleName='max-width-95p'>
                      {!notification.category.isApp
                        ? `${app.nomenclature.verboseName}: `
                        : ''}
                      {notification.category.name}
                      <Header.Subheader styleName='ellipsis'>
                        {notification.template}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                }
              />
            )
          })
        ) : (
          <Dropdown.Item disabled key={0} text='No new notifications' />
        )}
        {this.state.count && this.state.notifications ? (
          <Dropdown.Item
            as={Link}
            to={urlAllNotifications()}
            key={-1}
            text='See all'
          />
        ) : null}
      </>
    )
  }
}

export default NotificationsListView
