import { combineReducers } from 'redux'

import theme from 'core/common/src/reducers/theme'
import appList from 'core/common/src/reducers/appList'

export default combineReducers({
  appList: appList,
  theme: theme
})
