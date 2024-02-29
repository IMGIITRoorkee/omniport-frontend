import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * This adds the prop 'color' to any Semantic UI component
 * (HOC means Higher Order Component, in case you were wondering)
 *
 * @param WrappedComponent: the component to apply colour to
 */
const withThemeColor = WrappedComponent => {
  class NewComponent extends React.Component {
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  NewComponent.propTypes = {
    color: PropTypes.string
  }

  const mapStateToProps = state => {
    return {
      color: state.getIn(['theme', 'selectedColor'])
    }
  }

  return connect(mapStateToProps, {})(NewComponent)
}

export default withThemeColor
