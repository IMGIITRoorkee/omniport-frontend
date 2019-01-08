const dirTree = require('directory-tree')
const jsonfile = require('jsonfile')

const configs = {}
const configFile = './core/configs.json'

const primarySidebarConfigs = {}
const primarySidebarConfigFile = './core/primarySidebarConfigs.json'

/**
 * Reads the folder and makes an array of the folder structure,
 * extracting data from the file 'config.json'
 *
 * @param folderName: the name of the folder to read
 */
function readFolder (folderName) {
  let arr = []

  let directoryTree = dirTree(folderName)
  directoryTree.children.map(child => {
    if (child.children) {
      child.children.map(sub_child => {
        if (sub_child.name === 'config.json') {
          let obj = jsonfile.readFileSync(sub_child.path, { throws: false })
          if (obj) {
            arr.push(obj)
          }
        }
      })
    }
  })

  return arr
}

/**
 * Writes the array generated into the file 'structure.json'
 * in the directory 'core'
 *
 * @param path: the path where to write to the file
 * @param config: the config object to write to the file
 */
function writeConfigs (path, config) {
  jsonfile.writeFileSync(path, config)
}

// Discovery
configs['services'] = readFolder('./services')
configs['apps'] = readFolder('./apps')
writeConfigs(configFile, configs)

// Configuration
let services = readFolder('./services')
services = services.filter(x => {
  if (x.primarySidebar) {
    if (!x.primarySidebar.priority) {
      x.primarySidebar.priority = 9999 /** Infinity**/
    }
    return true
  } else {
    return false
  }
})
services = services.sort((a, b) => {
  return (
    a.primarySidebar.priority - b.primarySidebar.priority ||
    a.nomenclature.name.localeCompare(b.nomenclature.name)
  )
})
primarySidebarConfigs['services'] = services.map(x => {
  return {
    icon: x.primarySidebar.icon || 'bullseye',
    name: x.nomenclature.verboseName,
    path: x.baseUrl
  }
})
writeConfigs(primarySidebarConfigFile, primarySidebarConfigs)
