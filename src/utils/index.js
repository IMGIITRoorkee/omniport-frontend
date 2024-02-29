import { groupBy, spread, merge, reject, orderBy } from 'lodash'

import config from 'core/src/configs/configs.json'
import colorData from '../assets/colorData.json'

/**
 * Determine whether a role exists in the given array
 *
 * @param {array} roles - The array of roles a person has
 * @param {string} role - The role whose existence is being checked
 * @returns {string} The ActiveStatus enum or NOT_ROLE
 */
export const ifRole = (roles, role) => {
  if (roles === undefined) {
    return 'EMPTY_ROLES_ARRAY'
  }
  let a = roles.filter(x => {
    return x['role'] === role
  })
  if (a.length !== 0) {
    switch (a[0]['activeStatus']) {
      case 'ActiveStatus.IS_ACTIVE':
        return 'IS_ACTIVE'
      case 'ActiveStatus.HAS_BEEN_ACTIVE':
        return 'HAS_BEEN_ACTIVE'
      case 'ActiveStatus.WILL_BE_ACTIVE':
        return 'WILL_BE_ACTIVE'
      default:
        return 'NOT_ROLE'
    }
  } else {
    return 'NOT_ROLE'
  }
}

/**
 * Returns cookie corresponding to key
 *
 * @param {string} cname - The key corresponding to which cookie is required
 * @returns {string} The cookie key's value or null
 */
export const getCookie = cname => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * It's cool 😎
 */
export const consoleIMG = () => {
  const logo =
    '\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████████████████████████████████████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         █████████         █████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '                                    █████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████\n' +
    '█████████         ███████████████████████████'
  console.log(`%c${logo}`, 'border-left: 4px solid #0D68AF; padding-left: 8px;')
  console.log(
    '%cMade with ❤️ by IMG',
    'border-left: 4px solid #379FFF; padding-left: 8px; font-family: "Arial"; font-size: 16px;'
  )
}

/**
 *
 * @param {array} apiList List of apps by backend.
 * @return {array} List containing common apps,
 */
export function commonApps (apiList) {
  // Concatenate two arrays to add up all objects in one array.
  var commonList = apiList.concat(config.apps) // config.apps contain apps registered on frontend.
  // Group objects in array with same app name.
  commonList = groupBy(commonList, obj => obj.nomenclature.name)
  // Remove the objects which were not matched.
  commonList = reject(commonList, { length: 1 })
  // Spread the arrays in array.
  commonList = commonList.map(spread(merge))
  // Sort the list according to verbose name.
  commonList = orderBy(commonList, obj => obj.nomenclature.verboseName, ['asc'])
  return commonList
}

/**
 * To return app details from frontend
 *
 * @param {string} appName - The name of app corresponding to which details are required
 * @returns {object} The object containing if app or service exist and its details
 */
export const appDetails = appName => {
  let details
  let present = false
  let service = config.services.find(
    service => service.nomenclature.name === appName
  )
  let app = config.apps.find(app => app.nomenclature.name === appName)
  if (!service && !app) {
    present = false
  } else {
    present = true
    details = app || service
  }
  return {
    present: present,
    details: details
  }
}

/**
 *To return  active semantic color theme
 *
 * @returns {string} Active semantic color theme
 */
export const getTheme = () => {
  const theme = localStorage.getItem('selectedColor')
  if (theme && colorData.list.some(e => e.name === theme)) {
    return theme
  } else if (theme === 'roulette') {
  } else {
    localStorage.setItem('selectedColor', 'violet')
  }
  return 'violet'
}

/**
 *To return  active semantic color theme object
 *
 * @returns {object} Active semantic color theme object
 */
export const getThemeObject = () => {
  return colorData.list.find(x => {
    return x.name === getTheme()
  })
}

/**
 * Set cookie corresponding to key
 *
 * @param {string} cname - The key corresponding to which cookie is to set
 * @param {string} cvalue - Value of the cookie to be set
 * @param {number} days - Number of days until the set cookie expires
 * @returns {object} Object of the set cookie
 */
export const setCookie = (cname, cvalue, days) => {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = cname + '=' + (cvalue || '') + expires + '; path=/'
  return { key: cname, value: cvalue, days: days }
}
