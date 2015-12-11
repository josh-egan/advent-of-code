var babelConfig = require('./test/wallaby-babel-config')

module.exports = function (wallaby) {
   return {
     files: [
       'test/assign-globals.js',
       'challenges/**/*.js',
       '!challenges/**/*.specs.js'
     ],
     tests: [
       'challenges/**/*.specs.js'
     ],
     compilers: {
       '**/*.js': wallaby.compilers.babel(babelConfig)
     },
     env: {
       type: 'node',
       runner: 'node'
     },
     delays: {
       edit: 0,
       run: 0
     },
     debug: false,
     bootstrap: function() {
       require('./test/assign-globals')
     }
   }
 }
