import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import NoMatch from './NoMatch'
import { setAppList } from 'core/common/src/actions/appList'
import Loading from 'formula_one/src/components/loading'

import configs from './configs.json'

/*
 This the the entry point for Omniport
*/

class App extends React.Component {
  componentDidMount () {
    this.props.SetAppList()
  }

  render () {
    const { appList } = this.props
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
          {appList.isLoaded &&
            appList.data.map((app, index) => {
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
          {/* Temporary 404 page */}
          {appList.isLoaded && <Route component={NoMatch} />}
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps (state) {
  return {
    appList: state.appList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SetAppList: () => {
      dispatch(setAppList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
