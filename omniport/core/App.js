import React, { Component, Suspense } from 'react'
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  history
} from 'react-router-dom'
import { connect } from 'react-redux'

import { Loading, NoMatch } from 'formula_one'
import { setAppList } from 'core/common/src/actions/appList'

import primarySidebarConfig from 'core/primarySidebarConfigs.json'
import configs from './configs.json'
import OmniportFrame from './common/src/components/omniport-frame.js'

/*
 This is the entry point for Omniport
*/

class App extends Component {
  componentDidMount () {
    this.props.setAppList()
  }

  render () {
    const { appList } = this.props
    return (
      <Suspense fallback={Loading}>
        <BrowserRouter history={history}>
          <Switch>
            {/* Root route to redirect to the service with the highest priority
            in the sidebar */}
            <Route
              exact
              path='/'
              render={props => (
                <Redirect
                  to={
                    primarySidebarConfig.services[0]
                      ? primarySidebarConfig.services[0].path
                      : '/404'
                  }
                />
              )}
            />

            {/* Route to serve the services whose config.json does contain
            the object primarySidebar in the Omniport frame */}
            <Route
              path={configs.services
                .filter(service => {
                  return service.primarySidebar
                })
                .map(service => {
                  return service.baseUrl
                })}
              component={OmniportFrame}
            />

            {/* Route to serve the services whose config.json does not contain
            the object primarySidebar  */}
            {configs.services
              .filter(service => {
                return !service.primarySidebar
              })
              .map((service, index) => {
                return (
                  <Route
                    path={service.baseUrl}
                    key={index}
                    component={React.lazy(() =>
                      import(`services/${service.source}`)
                    )}
                  />
                )
              })}

            {/* Route to serve apps */}
            {appList.isLoaded &&
              appList.data.map((app, index) => {
                return (
                  <Route
                    path={app.baseUrl}
                    key={index}
                    component={React.lazy(() => import(`apps/${app.source}`))}
                  />
                )
              })}

            {/* Default 404 page */}
            {appList.isLoaded && <Route component={NoMatch} />}
          </Switch>
        </BrowserRouter>
      </Suspense>
    )
  }
}

const mapStateToProps = state => {
  return {
    appList: state.appList
  }
}

export default connect(
  mapStateToProps,
  { setAppList }
)(App)
