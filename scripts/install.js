// const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

let appDir = path.resolve('../../')

let templateDir = path.resolve(__dirname, '../', 'template')
let templateFiles = [
  '/.editorconfig',
  '/.eslintrc.json',
  '/.gitignore',
  '/macup.sh',
  '/README.md',
  '/package.json'
]

templateFiles.forEach(function (file) {
  if (!fs.existsSync(appDir + file)) {
    if (file === '/.gitignore') {
      fs.copyFileSync(templateDir + '/.gitignore-dist', appDir + file)
    } else {
      fs.copyFileSync(templateDir + file, appDir + file)
    }
  }
})