import React from 'react'
import axios from 'axios'
import { Icon, Image, Segment, Popup, Transition } from 'semantic-ui-react'
import { BrowserView, MobileView } from 'react-device-detect'
import { includes } from 'lodash'

import {
  consoleIMG,
  urlMaintainersBranding,
  urlGif,
  Surprise
} from 'formula_one'

import blocks from '../css/app-footer.css'
import inline from '../css/inline.css'

let logger = []
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]
const konami = '38,38,40,40,37,39,37,39,66,65,13'
class AppFooter extends React.PureComponent {
  constructor (props) {
    super(props)
    const date = new Date()
    this.state = {
      year: date.getFullYear(),
      maintainer: null,
      loaded: false,
      surprise: 0,
      surpriseVisibility: false
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyPress)
    consoleIMG()
    this.addBranding()
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  addBranding = () => {
    axios
      .get(urlMaintainersBranding())
      .then(res => {
        this.setState({
          loaded: true,
          maintainer: res.data
        })
      })
      .catch(err => {})
  }

  surpriseCounter = () => {
    this.setState({
      surprise: this.state.surprise + 1
    })
  }

  handleKeyPress = e => {
    if (includes(konamiCode, e.keyCode)) {
      logger.push(e.keyCode)
      if (logger.toString().indexOf(konami) >= 0) {
        console.log(
          '%c     ',
          `font-size: 15em; background: url(${window.location.origin}${urlGif(
            'hammy'
          )}) no-repeat; background-size: contain;`
        )
        console.log('Hey Hammy')
        logger = []
      }
    } else {
      logger = []
    }
  }

  getReadyForSurprise = () => {
    this.setState({
      surpriseVisibility: true
    })
  }

  render () {
    const {
      year,
      loaded,
      maintainer,
      surprise,
      surpriseVisibility
    } = this.state
    const { creators } = this.props
    return (
      <Segment
        attached
        onClick={this.surpriseCounter}
        textAlign='center'
        styleName='inline.padding-half'
      >
        <BrowserView>
          <div
            styleName='blocks.footer-container'
            onKeyPress={this.handleKeyPress}
            tabIndex='0'
          >
            {surprise < 2 ? (
              <React.Fragment>
                <div styleName='blocks.footer-wrapper'>
                  <span>© {year}</span>
                  {loaded && maintainer.imagery.favicon ? (
                    <Image
                      styleName='blocks.footer-logo'
                      src={maintainer.imagery.favicon}
                      verticalAlign='middle'
                      alt={maintainer.text.name}
                      inline
                    />
                  ) : (
                    ', '
                  )}
                  <a href={loaded ? maintainer.text.homePage : '/'}>
                    <span>{loaded && maintainer.text.name}</span>
                  </a>
                </div>
                <div styleName='blocks.footer-wrapper'>
                  Powered by{' '}
                  <Image
                    styleName='blocks.footer-logo'
                    src='https://omniport.readthedocs.io/en/latest/_static/favicon.ico'
                    verticalAlign='middle'
                    alt='Omniport'
                    inline
                  />
                  <a href='https://omniport.readthedocs.io' target='_blank'>
                    Omniport
                  </a>
                </div>
              </React.Fragment>
            ) : (
              <div style={{ margin: 'auto' }}>
                {surpriseVisibility || (
                  <Popup
                    trigger={
                      <Icon
                        name='heart'
                        onClick={this.getReadyForSurprise}
                        color='red'
                      />
                    }
                    content='Meet the team'
                    position='top center'
                  />
                )}
                <Transition
                  visible={surpriseVisibility}
                  animation='fly up'
                  duration={500}
                >
                  <Surprise creators={creators} />
                </Transition>
              </div>
            )}
          </div>
        </BrowserView>
        <MobileView>
          <div styleName='blocks.footer-container-mobile'>
            <React.Fragment>
              <div>
                {/*
                  This hidden to preserve valuable space on mobile
                  <span>
                    © {year}
                  </span>
                  <br />
                */}
                {loaded && maintainer.imagery.favicon && (
                  <Image
                    styleName='blocks.footer-logo'
                    src={maintainer.imagery.favicon}
                    verticalAlign='middle'
                    alt={maintainer.text.name}
                    inline
                  />
                )}
                <a href={loaded ? maintainer.text.homePage : '/'}>
                  <span>{loaded && maintainer.text.name}</span>
                </a>
                {/*
                  <br />
                  <a href='/' styleName='inline.margin-top-half'>
                    {branding.siteInfo && branding.siteInfo['siteVerboseName']}
                  </a>
                */}
              </div>
            </React.Fragment>
          </div>
        </MobileView>
      </Segment>
    )
  }
}

export default AppFooter
