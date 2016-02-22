import increment from './increment'

function hasValidCharacters(password) {
  const invalidCharsRegex = /[iol]/g
  return !invalidCharsRegex.test(password)
}

function hasRequiredCharacterPairs(password) {
  const pairsRegex = /(\w)\1.*(\w)\2/g
  const result = pairsRegex.exec(password)
  return result !== null && result.length >= 3 && result[1] !== result[2]
}

function hasRequiredCharacterSequence(password) {
  const charArray = password.split('')
  for (let i = 0; i < charArray.length - 3; i++) {
    let startCode = charArray[i].charCodeAt(0)
    if (charArray[i + 1].charCodeAt(0) === startCode + 1 &&
        charArray[i + 2].charCodeAt(0) === startCode + 2)
        return true
  }
  return false
}

function isValidPassword(password) {
  return hasValidCharacters(password) &&
    hasRequiredCharacterPairs(password) &&
    hasRequiredCharacterSequence(password)
}

export default {
  getNextPassword(currentPassword) {
    let newPassword = increment.string(currentPassword.toLowerCase())

    while (!isValidPassword(newPassword)) {
      newPassword = increment.string(newPassword)
    }

    return newPassword
  }
}
