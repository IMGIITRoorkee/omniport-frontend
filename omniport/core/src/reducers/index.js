import { combineReducers } from 'redux'

import theme from 'core/common/src/reducers/theme'
import appList from 'core/common/src/reducers/appList'
import auth from 'core/common/src/reducers/auth'

export default combineReducers({
  appList: appList,
  theme: theme,
  user: auth
})
