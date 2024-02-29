import React from 'react'
import axios from 'axios'
import { Placeholder } from 'semantic-ui-react'

import { getThemeObject, urlGravatarProfileAvatar } from 'formula_one'

import '../css/default-dp.css'

var getInitials = function (string) {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}
class DefaultDP extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      gravatar: false
    }
  }
  componentDidMount () {
    const { gravatarHash, size } = this.props
    if (gravatarHash) {
      axios
        .get(urlGravatarProfileAvatar(gravatarHash), {
          responseType: 'arraybuffer',
          params: {
            d: 404,
            s: size ? size.slice(0, -2) * 14 : 21
          }
        })
        .then(res => {
          const image = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          this.setState({
            loading: false,
            gravatar: `data:${res.headers[
              'content-type'
            ].toLowerCase()};base64,${image}`
          })
        })
        .catch(err => {
          this.setState({
            loading: false,
            gravatar: false
          })
        })
    } else {
      this.setState({
        loading: false,
        gravatar: false
      })
    }
  }
  render () {
    const { name, size } = this.props
    const { loading, gravatar } = this.state
    const { dualInitials } = this.props
    return (
      <React.Fragment>
        {loading ? (
          <Placeholder
            style={{
              width: size || '1.5em',
              height: size || '1.5em'
            }}
          >
            <Placeholder.Image square />
          </Placeholder>
        ) : gravatar ? (
          <img src={gravatar} styleName='avatar-image' />
        ) : (
          <div
            styleName='avatar-image'
            style={{ background: getThemeObject().hexCode }}
          >
            <span
              styleName='avatar-image-text'
              style={{ fontSize: size }}
            >{dualInitials ? getInitials(name) : `${name && name[0].toUpperCase()}`}</span>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default DefaultDP
