function countMatches(s, regex) {
  let matches = s.match(regex)
  if (matches === null) return 0
  else return matches.length
}

export default {
  getFloor(input) {
    let up = countMatches(input, /\(/g)
    let down = countMatches(input, /\)/g)
    return up - down
  },

  getBasementEntryPosition(input) {
    let directions = input.split('')
    let floor = 0
    let idx = 0
    while (idx < directions.length && floor >= 0) {
      let movement = directions[idx] === '(' ? 1 : -1
      floor += movement
      idx++
    }
    if (floor === -1) return idx
    else throw new Error('Santa never entered the basement!')
  }
}
