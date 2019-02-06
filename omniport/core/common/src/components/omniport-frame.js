import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { isMobile, isBrowser } from 'react-device-detect'

import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain } from 'formula_one'
import configs from 'core/configs.json'

import main from 'formula_one/src/css/app.css'

export default class OmniportFrame extends React.PureComponent {
  render () {
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend developer',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='main.app'>
          <AppHeader userDropdown dummy={{}} />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}
              <Switch>
                {configs.services.map((service, index) => {
                  return (
                    <Route
                      key={index}
                      path={service.baseUrl}
                      component={React.lazy(() =>
                        import(`services/${service.source}`)
                      )}
                    />
                  )
                })}
              </Switch>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}
