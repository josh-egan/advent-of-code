import _ from 'lodash'

export default {
  getNumberOfHousesVisited(directions) {
    let location = {x: 0, y: 0}
    let locationsVisited = []
    locationsVisited.push(_.clone(location))
    directions.split('').forEach(char => {
      if (char === '>') location.x++
      if (char === '<') location.x--
      if (char === '^') location.y++
      if (char.toLowerCase() === 'v') location.y--

      if (_.find(locationsVisited, location) === undefined)
        locationsVisited.push(_.clone(location))
    })

    return locationsVisited.length
  },

  getHousesVisitedWithRoboSanta(directions) {
    let santaLocation = {x: 0, y: 0}
    let robotLocation = {x: 0, y: 0}
    let santasTurn = true
    let locationsVisited = []
    locationsVisited.push(_.clone(santaLocation))
    directions.split('').forEach(char => {
      let location = santasTurn ? santaLocation : robotLocation
      santasTurn = !santasTurn
      if (char === '>') location.x++
      if (char === '<') location.x--
      if (char === '^') location.y++
      if (char.toLowerCase() === 'v') location.y--

      if (_.find(locationsVisited, location) === undefined)
        locationsVisited.push(_.clone(location))
    })

    return locationsVisited.length
  }
}
