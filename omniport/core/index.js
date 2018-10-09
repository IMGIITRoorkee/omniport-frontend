import React from 'react'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loading from 'formula_one/src/components/loading'

import configureStore from './src/store/configureStore'
import registerServiceWorker from 'registerServiceWorker'

import configs from './configs.json'

/*
 This the the entry point for Omniport
*/

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          {configs.services.map((service, index) => {
            return (
              <Route
                path={service.baseUrl}
                key={index}
                component={Loadable({
                  loader: () => import(`services/${service.source}`),
                  loading: Loading
                })}
              />
            )
          })}
          {configs.apps.map((app, index) => {
            return (
              <Route
                path={app.baseUrl}
                key={index}
                component={Loadable({
                  loader: () => import(`apps/${app.source}`),
                  loading: Loading
                })}
              />
            )
          })}
        </Switch>
      </BrowserRouter>
    )
  }
}

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
registerServiceWorker()
