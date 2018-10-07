import { applyMiddleware, compose, createStore } from 'redux'

import createHistory from 'history/createBrowserHistory'

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers'

export const history = createHistory()

function configureStoreProd (initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // More middleware goes here ...

    // Thunk can also accept an extra argument to be passed to each action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,

    reactRouterMiddleware
  ]

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )
}

function configureStoreDev (initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // More middleware goes here ...

    // Raises an error when you try to mutate your state either inside or between dispatches
    reduxImmutableStateInvariant(),

    // Thunk can also accept an extra argument to be passed to each action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,

    reactRouterMiddleware
  ]

  // Add support for Redux developer tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    // Enable HMR for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const configureStore = process.env.NODE_ENV === 'production'
  ? configureStoreProd
  : configureStoreDev

export default configureStore
