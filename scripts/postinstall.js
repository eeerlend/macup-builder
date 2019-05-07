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
  '/README.md'
]

templateFiles.forEach(function (file) {
  fs.copyFile(templateDir + file, appDir + file, (err) => {
    if (err) throw err
  })
})
