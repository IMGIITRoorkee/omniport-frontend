import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './src/store/configureStore'
import App from './App'
import styles from './index.css'
import './index.css'
import * as serviceWorker from './serviceWorker'

export const store = configureStore()
window.store = store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
  })
}

serviceWorker.register()
