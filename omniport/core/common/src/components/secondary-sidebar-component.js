import React from 'react'

import PropTypes from 'prop-types'

import { Header } from 'semantic-ui-react'

import '../css/secondary-sidebar-component.css'

class SecondarySidebarComponent extends React.PureComponent {
  render () {
    const {header, icon, children} = this.props
    const headerProps = {
      as: 'h4',
      content: header,
      icon
    }
    return (
      <div styleName={`secondary-sidebar-component`}>
        <Header {...headerProps} />
        {children}
      </div>
    )
  }
}

SecondarySidebarComponent.propTypes = {
  header: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

export default SecondarySidebarComponent
