import React from 'react'

import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import Loading from 'formula_one/src/components/loading'

import configs from './configs.json'

/*
 This the the entry point for Omniport
*/

export default class App extends React.Component {
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
