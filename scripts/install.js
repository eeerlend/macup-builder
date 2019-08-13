#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

console.info('Setting up macup!')

let appDir = path.resolve('.')

console.info(' appDir: ' + appDir)

let templateDir = path.resolve(__dirname, '../', 'template')
let templateFiles = [
  '/.editorconfig',
  '/.eslintrc.json',
  '/.gitignore',
  '/macup.sh',
  '/README.md',
  '/package.json',
  '/dist/my.config'
]

templateFiles.forEach(function (file) {
  if (!fs.existsSync(appDir + file)) {

    // Create directory if it doesn't exist already
    let pathName = path.parse(appDir + file).dir
    fs.mkdirsSync(pathName)

    if (file === '/.gitignore') {
      fs.copyFileSync(templateDir + '/.gitignore-dist', appDir + file)
    } else {
      fs.copyFileSync(templateDir + file, appDir + file)
    }
  }
})
