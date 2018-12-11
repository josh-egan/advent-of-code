
const minCharCode = 'a'.charCodeAt(0)
const maxCharCode = 'z'.charCodeAt(0)

function incrementCharAt(charArray, idx) {
  if (idx < 0) {
    charArray.unshift('a')
    return charArray
  }

  const currentChar = charArray[idx]
  const asciiCode = currentChar.charCodeAt(0)
  if (asciiCode < minCharCode || asciiCode > maxCharCode)
    throw new Error('unexpected character: ' + charArray[idx])
  else if (asciiCode < maxCharCode) {
    const nextCharCode = asciiCode + 1
    const nextChar = String.fromCharCode(nextCharCode)
    charArray[idx] = nextChar
    return charArray
  } else {
    charArray[idx] = String.fromCharCode(minCharCode)
    return incrementCharAt(charArray, idx - 1)
  }
}

export default {
  string(input) {
    const lowerCasedInput = input.toLowerCase()
    const characters = lowerCasedInput.split('')
    const incrementedCharacters = incrementCharAt(characters, input.length - 1)
    return incrementedCharacters.join('')
  }
}
