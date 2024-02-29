import React from 'react'
import { Header, Button } from 'semantic-ui-react'

import { getTheme, urlErrorAssets } from 'formula_one'

import blocks from '../css/error-dart.css'

export default class ErrorDart extends React.PureComponent {
  render () {
    return (
      <div>
        <div styleName='blocks.error-header'>
          <div styleName='blocks.dart-text-container'>
            <Header as='h1'>
              404: Foundn't
              <Header.Subheader>Content not found</Header.Subheader>
            </Header>
            <Button
              basic
              as='a'
              href='https://youtu.be/dQw4w9WgXcQ?t=43&lc=Ugx5eioe8QbJJGWVZ0x4AaABAg'
              target='_blank'
              color={getTheme()}
            >
              Go back?
            </Button>
          </div>
          <div styleName='blocks.board-container'>
            <img
              src={urlErrorAssets('dartboard')}
              styleName='blocks.dartboard'
            />
          </div>
        </div>
        <div styleName='blocks.error-body'>
          <div styleName='blocks.person-container'>
            <img
              src={urlErrorAssets('person_stressed')}
              styleName='blocks.person'
            />
          </div>
          <div styleName='blocks.dart-container'>
            <img src={urlErrorAssets('dart')} styleName='blocks.dart' />
          </div>
        </div>
      </div>
    )
  }
}
