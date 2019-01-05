const initialState = {
  isAuthenticated: 'checking',
  details: {
    profile: {
      loggedIn: false,
      user: {}
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return {
        ...state,
        isAuthenticated: true,
        details: {
          loaded: true,
          profile: action.payload
        }
      }
    }

    case 'LOG_OUT': {
      return {
        ...state,
        isAuthenticated: false,
        details: {
          ...state.details,
          loaded: false
        }
      }
    }

    default: {
      return state
    }
  }
}
