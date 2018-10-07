import { Map, List } from 'immutable'

const initialState = new Map({
  selectedColor: localStorage.getItem('selectedColor') || 'blue',

  // TODO: Add more color choices
  colors: new List([
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'grey',
    'black'
  ])
})


export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME': {
      localStorage.setItem('selectedColor', action.color)
      return state.set('selectedColor', action.color)
    }
    default:
      return state
  }
}
