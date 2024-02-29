import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Loading (props) {
  if (props.isLoading || true) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>
    } else if (props.pastDelay || true) {
      return (
        <Segment
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 0,
            margin: 0,
            flexGrow: 1
          }}
          basic
        >
          <Dimmer active inverted>
            <Loader size='large' />
          </Dimmer>
        </Segment>
      )
    } else {
      return null
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>
  } else {
    return null
  }
}
