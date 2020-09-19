import React, { Component, Suspense } from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { SemanticToastContainer } from 'react-semantic-toasts'

import { Loading, NoMatch } from 'formula_one'
import { setAppList } from 'core/common/src/actions/appList'

import primarySidebarConfig from 'core/src/configs/primarySidebarConfigs.json'
import configs from 'core/src/configs/configs.json'

import { OmniportFrame } from './common/src/components/omniport-frame.js'

/*
 This is the entry point for Omniport
*/

class App extends Component {
  componentDidMount () {
    this.props.setAppList()
  }

  componentDidUpdate (prevProps) {
    /* Update appList when 
       1. Authentication changes
       2. A person is authenticated and appList is errored
    */
    if (this.props.isAuthenticated !== prevProps.isAuthenticated ||
        (this.props.isAuthenticated === true && this.props.appList.errored === true)
      ) {
      this.props.setAppList()
    }
  }

  render () {
    const { appList, history } = this.props
    return (
      <Suspense fallback={Loading}>
        {/* Container for toast notifications */}
        <SemanticToastContainer />

        <Router history={history}>
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
            {appList && appList.isLoaded && (
              <Switch>
                {appList.data.map((app, index) => {
                  return (
                    <Route
                      path={app.baseUrl}
                      key={index}
                      component={React.lazy(() => import(`apps/${app.source}`))}
                    />
                  )
                })}

                {/* Default 404 page */}
                <Route component={({history}) => <NoMatch history={history} />} />
              </Switch>
            )}
          </Switch>
        </Router>
      </Suspense>
    )
  }
}

const mapStateToProps = state => {
  return {
    appList: state.appList,
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(
  mapStateToProps,
  { setAppList }
)(App)
