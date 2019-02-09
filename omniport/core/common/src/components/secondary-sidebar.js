import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import '../css/secondary-sidebar.css'

class SecondarySidebar extends React.PureComponent {
  render () {
    const { children, withScrollbars } = this.props
    return (
      <div styleName='secondary-sidebar'>
        {withScrollbars ? (
          <Scrollbars autoHide className='scrollbar-wrapper'>
            {children}
          </Scrollbars>
        ) : (
          children
        )}
      </div>
    )
  }
}

SecondarySidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  withScrollbars: PropTypes.bool
}

SecondarySidebar.defaultProps = {
  withScrollbars: true
}

export default SecondarySidebar
