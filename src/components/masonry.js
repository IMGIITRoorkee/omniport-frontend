import React from 'react'
import PropTypes from 'prop-types'

function getMinColumn (data) {
  let minObject = data['column0']
  let min = data['column0'].height
  let minProperty = 'column0'
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      if (min > data[property].height) {
        min = data[property].height
        minObject = data[property]
        minProperty = property
      }
    }
  }
  return { prop: minProperty, obj: minObject }
}
export const MasonryLayout = props => {
  const columnWrapper = {} // data
  const result = []
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = { height: 0, data: [] }
  }

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = getMinColumn(columnWrapper).prop
    columnWrapper[columnIndex].height = columnWrapper[columnIndex].height + 1
    if (props.children[i].props.image) {
      columnWrapper[columnIndex].height = columnWrapper[columnIndex].height + 1
    }
    columnWrapper[columnIndex].data.push(
      <React.Fragment key={i}>{props.children[i]}</React.Fragment>
    )
  }
  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
        key={i}
      >
        {columnWrapper[`column${i}`].data}
      </div>
    )
  }
  return <div style={{ display: 'flex' }}>{result}</div>
}

MasonryLayout.propTypes = {
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
}
MasonryLayout.defaultProps = {
  columns: 2,
  gap: 10
}
