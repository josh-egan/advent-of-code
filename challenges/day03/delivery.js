function stringifyLocation(location) {
  return `{ x: ${location.x}, y: ${location.y} }`
}

export default {
  getNumberOfHousesVisited(directions) {
    let location = {x: 0, y: 0}
    let locationsVisited = {}
    let locationsVisitedCount = 0

    locationsVisited[stringifyLocation(location)] = true
    locationsVisitedCount++

    directions.split('').forEach(char => {
      if (char === '>') location.x++
      if (char === '<') location.x--
      if (char === '^') location.y++
      if (char.toLowerCase() === 'v') location.y--

      let stringifiedLocation = stringifyLocation(location)
      if (!locationsVisited[stringifiedLocation]) {
        locationsVisited[stringifiedLocation] = true
        locationsVisitedCount++
      }
    })

    return locationsVisitedCount
  },

  getHousesVisitedWithRoboSanta(directions) {
    let santaLocation = {x: 0, y: 0}
    let robotLocation = {x: 0, y: 0}
    let santasTurn = true

    let locationsVisited = {}
    let locationsVisitedCount = 0

    locationsVisited[stringifyLocation(santaLocation)] = true
    locationsVisitedCount++

    directions.split('').forEach(char => {
      let location = santasTurn ? santaLocation : robotLocation
      santasTurn = !santasTurn
      if (char === '>') location.x++
      if (char === '<') location.x--
      if (char === '^') location.y++
      if (char.toLowerCase() === 'v') location.y--

      let stringifiedLocation = stringifyLocation(location)
      if (!locationsVisited[stringifiedLocation]) {
        locationsVisited[stringifiedLocation] = true
        locationsVisitedCount++
      }
    })

    return locationsVisitedCount
  }
}
