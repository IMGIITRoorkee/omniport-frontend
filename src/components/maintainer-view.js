import React from 'react'
import axios from 'axios'

import { urlRights } from 'formula_one'
class MaintainerView extends React.PureComponent {
  state = {
    hasRights: false
  }
  getSpecialRights = () => {
    axios
      .get(urlRights(this.props.which))
      .then(res => {
        this.setState({
          hasRights: res.data['hasRights']
        })
      })
      .catch(err => {
        this.setState({
          hasRights: false
        })
      })
  }
  componentDidMount () {
    this.getSpecialRights()
  }

  render () {
    const { children } = this.props
    return <React.Fragment>{this.state.hasRights && children}</React.Fragment>
  }
}

export default MaintainerView
