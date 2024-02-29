import React from 'react'
import axios from 'axios'

import { urlGif, urlRoulette } from 'formula_one'

import blocks from '../css/app.css'
class AppMain extends React.PureComponent {
  state = {
    appMainSurprise: {}
  }
  componentDidMount () {
    if (
      window.localStorage.getItem('selectedColor') ||
      window.localStorage.getItem('selectedColor') !== 'roulette'
    ) {
      localStorage.setItem(
        'hint',
        'Try to set value of selectedColor to roulette'
      )
    }
    if (window.localStorage.getItem('selectedColor') === 'roulette') {
      localStorage.setItem('hint', 'To go back, Remove roulette!!')
      axios
        .get(urlRoulette())
        .then(res => {
          console.log(
            '' +
              'Never gonna give you up, \n' +
              'Never gonna let you down, \n' +
              'Never gonna run around and desert you \n' +
              'Never gonna make you cry, \n' +
              'Never gonna say goodbye, \n' +
              'Never gonna tell a lie and hurt you'
          )
        })
        .catch(err => {
          if (err.response.data) {
            const index = Math.floor(Math.random() * err.response.data.count)
            this.setState({
              appMainSurprise: {
                flexGrow: '1',
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                justifyContent: 'center',
                background: `url(${window.location.origin +
                  urlGif('roulette/' + index)})`,
                backgroundPosition: 'center'
              }
            })
          }
        })
    }
  }
  render () {
    const { appMainSurprise } = this.state
    return (
      <React.Fragment>
        {window.localStorage.getItem('selectedColor') === 'roulette' ? (
          <div style={appMainSurprise} />
        ) : (
          this.props.children
        )}
      </React.Fragment>
    )
  }
}

export default AppMain
