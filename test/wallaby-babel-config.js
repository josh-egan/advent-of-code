var babel = require('babel')
var fs = require('fs')
var path = require('path')

var babelrcPath = path.join(__dirname, '..', '.babelrc')
var babelConfig = JSON.parse(fs.readFileSync(babelrcPath, 'utf8'))

if (!babelConfig.optional)
  babelConfig.optional = ['runtime']
else if (!contains(babelConfig.optional, 'runtime'))
  babelConfig.optional.push('runtime')

babelConfig.babel = babel

module.exports = babelConfig

function contains(array, item) {
  return array.reduce(function(prev, cur) {
    return prev || cur === item
  }, false)
}
