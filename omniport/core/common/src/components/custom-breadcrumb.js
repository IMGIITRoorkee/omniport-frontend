import React from 'react'
import { Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { Breadcrumb, Header } from 'semantic-ui-react'

import { getTheme } from 'formula_one'

import '../css/custom-breadcrumb.css'

class CustomBreadcrumb extends React.PureComponent {
  render () {
    const { list } = this.props
    return (
      <React.Fragment>
        {isBrowser ? (
          <Breadcrumb styleName='breadcrumb'>
            {list.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Breadcrumb.Section link={Boolean(item.link)}>
                    {item.link ? (
                      <Link to={item.link}>
                        <Header as='h3' color={getTheme()}>
                          {item.name}
                        </Header>
                      </Link>
                    ) : (
                      <Header as='h3'>{item.name}</Header>
                    )}
                  </Breadcrumb.Section>
                  {list.length !== index + 1 && (
                    <Breadcrumb.Divider icon='right angle' />
                  )}
                </React.Fragment>
              )
            })}
          </Breadcrumb>
        ) : (
          <Header as='h3' styleName='breadcrumb'>
            {list[list.length - 1].name}
          </Header>
        )}
        <Header dividing styleName='breadcrumb-divider' />
      </React.Fragment>
    )
  }
}

export default CustomBreadcrumb
