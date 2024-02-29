import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'
import { startCase } from 'lodash'

import { DefaultDP } from 'formula_one'

import '../css/user-card.css'

export default class UserCard extends React.Component {
  render () {
    const {
      gravatarHash,
      image,
      name,
      size,
      username,
      roles,
      right
    } = this.props
    return (
      <Card fluid {...this.props}>
        <Card.Content styleName='user-card-wrapper'>
          <div styleName='user-card-container'>
            <div styleName='user-image-container'>
              {image ? (
                <Image src={image} alt={name} />
              ) : (
                <DefaultDP
                  name={name}
                  size={size}
                  gravatarHash={gravatarHash}
                />
              )}
            </div>
            <div styleName='user-card-desc'>
              <Header as='h4'>
                {name}
                <Header.Subheader>{username}</Header.Subheader>
                {roles && (
                  <Header.Subheader>
                    {roles
                      .map(role => {
                        return startCase(role)
                      })
                      .join(', ')}
                  </Header.Subheader>
                )}
              </Header>
            </div>
            {right && <div>{right}</div>}
          </div>
        </Card.Content>
      </Card>
    )
  }
}
