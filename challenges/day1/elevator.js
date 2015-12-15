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
    let s = input.slice(0)
    let floor = 0
    let idx = 0
    while (s.length > 0 && floor >= 0) {
      idx++
      let movement = s[0] === '(' ? 1 : -1
      floor += movement
      s = s.slice(1)
    }
    if (floor === -1) return idx
    throw new Error('You never entered the basement!')
  }
}
