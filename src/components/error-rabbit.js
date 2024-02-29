import React from 'react'
import { Header, Button } from 'semantic-ui-react'

import { getTheme, urlErrorAssets } from 'formula_one'

import blocks from '../css/error-rabbit.css'

export default class ErrorRabbit extends React.PureComponent {
  render () {
    return (
      <div>
        <div styleName='blocks.container'>
          <div styleName='blocks.error-header'>
            <Header as='h1' textAlign='center'>
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
          <div styleName='blocks.confetti-container'>
            <img
              src={urlErrorAssets('confetti_green')}
              styleName='blocks.confetti blocks.confetti_green'
            />
            <img
              src={urlErrorAssets('confetti_pink')}
              styleName='blocks.confetti blocks.confetti_pink'
            />
            <img
              src={urlErrorAssets('confetti_yellow')}
              styleName='blocks.confetti blocks.confetti_yellow'
            />
          </div>
          <div styleName='blocks.rabit-container'>
            <img src={urlErrorAssets('rabbit')} styleName='blocks.rabbit' />
          </div>
        </div>
      </div>
    )
  }
}
