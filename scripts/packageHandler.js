let fs = require('fs-extra')
let path = require('path')

module.exports.copyModule = function (packageName) {
  if (packageName === 'macup-builder') return

  let moduleDir = path.resolve(path.dirname(require.main.filename), '../')
  let appDir = path.resolve('..', '..')

  console.info('==================================================================')
  console.info(' Installing macup module: ' + packageName)
  console.info('==================================================================')

  // Creates /.editorconfig
  fs.mkdirsSync(appDir + '/dist/packages/' + packageName)

  fs.copySync(moduleDir + '/dist', appDir + '/dist/packages/' + packageName)

  // Fetch the configuration file from the package
  let moduleConfigFile = (path.resolve(moduleDir, 'dist') + '/package.config')
  let moduleConfig = fs.readFileSync(moduleConfigFile, 'utf8')
  let lines = moduleConfig.split('\n')

  let newConfig = []

  newConfig.push('# MODULE START : ' + packageName)

  for (let i = 0; i < lines.length; i++) {
    if ((i !== 1) && (lines[i][0] !== '#') && (lines[i] !== '')) {
      newConfig.push(lines[i])
    }
  }

  newConfig.push('# MODULE END : ' + packageName)
  newConfig.push('')

  // Create variables.sh file if it doesn't exist
  let variablesFile = appDir + '/dist/packages/macup-core/variables.sh'
  if (!fs.existsSync(variablesFile)) {
    fs.writeFileSync(variablesFile, '#!/bin/bash\n# shellcheck disable=SC2034\n')
  }

  let variablesConfig = fs.readFileSync(variablesFile, 'utf8')
  lines = variablesConfig.split('\n')

  let lineStart = Number
  let lineEnd = Number

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '# MODULE START : ' + packageName) {
      lineStart = i
    }

    if (lines[i] === '# MODULE END : ' + packageName) {
      lineEnd = i
    }
  }

  if ((lineStart !== undefined) && (lineEnd !== undefined)) {
    lines.splice(lineStart, (lineEnd - lineStart + 1))
    fs.writeFileSync(variablesFile, lines.join('\n'))
  }

  // Add module config to file
  fs.appendFileSync(variablesFile, newConfig.join('\n'))
}
