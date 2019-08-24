import axios from 'axios'

import { commonApps, urlAppList, urlWhoAmI } from 'formula_one'

export const setAppList = () => {
  return dispatch => {
    axios
      .get(urlWhoAmI())
      .then()
      .finally(() => {
        axios
          .get(urlAppList())
          .then(res => {
            console.log(res)
            dispatch({
              type: 'SET_APPLIST',
              payload: {
                isLoaded: true,
                errored: false,
                data: commonApps(res.data)
              }
            })
          })
          .catch(err => {
            console.log(err)
            dispatch({
              type: 'SET_APPLIST',
              payload: {
                isLoaded: true,
                errored: true,
                data: []
              }
            })
          })
      })
  }
}
