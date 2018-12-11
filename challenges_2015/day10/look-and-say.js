function playRound(input) {
  let chars = (input + 'E').split('')
  let currentChar = chars[0]
  let currentSequenceLength = 0
  let result = ''

  chars.forEach(nextChar => {
    if (nextChar === currentChar) currentSequenceLength++
    else {
      result += currentSequenceLength + currentChar
      currentChar = nextChar
      currentSequenceLength = 1
    }
  })

  return result
}

export default {
  play(input, cycles) {
    let result = input
    for (var i = 0; i < cycles; i++)
      result = playRound(result)

    return result
  }
}
