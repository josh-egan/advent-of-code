import readline from 'readline'
import fs from 'fs'
import path from 'path'

function numMatches(str, regExp) {
  let matches = str.match(regExp)
  return matches ? matches.length : 0
}

export default {
  strings(fileName) {
    let originalCodeLength = 0
    let inMemoryLength = 0

    let filePath = path.join(__dirname, fileName)
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });

    lineReader.on('line', function (line) {
      originalCodeLength += line.length
      inMemoryLength += eval(line).length
    });

    return new Promise((resolve, reject) => {
      lineReader.on('close', function() {
        resolve(originalCodeLength - inMemoryLength)
      })
    })
  },

  strings2(fileName) {
    let escapedLength = 0
    let originalCodeLength = 0

    let filePath = path.join(__dirname, fileName)
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });

    lineReader.on('line', function (line) {
      let escaped = '"' + line.replace(/\\/g, '\\\\').replace(/\"/g, '\\"') + '"'
      escapedLength += escaped.length
      originalCodeLength += line.length
    });

    return new Promise((resolve, reject) => {
      lineReader.on('close', function() {
        resolve(escapedLength - originalCodeLength)
      })
    })
  }
}
