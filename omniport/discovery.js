const dirTree = require('directory-tree')
const jsonfile = require('jsonfile')

const configs = {}
const file = './core/configs.json'

/**
 * Reads the folder and makes an array of the folder structure,
 * extracting data from the file 'config.json'
 *
 * @param name: the name of the folder to read
 */
function readFolder (name) {
  let directoryTree = dirTree(name)
  let arr = []
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
 * @param configs: the object to write to the file
 */
function writeConfigs (configs) {
  jsonfile.writeFileSync(file, configs)
}

// Discovery
configs['services'] = readFolder('./services')
configs['apps'] = readFolder('./apps')
writeConfigs(configs)
