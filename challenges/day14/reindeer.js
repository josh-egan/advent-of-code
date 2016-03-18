
export default {
  race(contestants, raceDuration) {
    let leader

    contestants.forEach(contestant => {
      let cycleTime = contestant.sprintTime + contestant.restTime
      let distancePerCycle = contestant.speed * contestant.sprintTime
      let completeCycles = Math.floor(raceDuration / cycleTime)
      let completeCyclesDistance = distancePerCycle * completeCycles

      let partialCycleTime = raceDuration % cycleTime
      let partialSprintTime = partialCycleTime < contestant.sprintTime ? partialCycleTime : contestant.sprintTime
      let partialSprintDistance = contestant.speed * partialSprintTime

      let distance = completeCyclesDistance + partialSprintDistance

      if (!leader || distance > leader.distance)
        leader = { name: contestant.name, distance }
    })

    return leader.distance
  },

  raceBySecond(contestants, raceDuration) {
    let racers = contestants.map(c => {
      return Object.assign({}, c, {score: 0, distance: 0, cycleTime: c.sprintTime + c.restTime})
    })

    for (let second = 1; second <= raceDuration; second++) {
      let maxDistance = 0
      racers.forEach(r => {
        let cyclePosition = second % r.cycleTime
        let isSprinting = cyclePosition > 0 && cyclePosition <= r.sprintTime

        if (isSprinting) r.distance += r.speed
        if (r.distance > maxDistance) maxDistance = r.distance
      })
      racers.forEach(r => {
        if (r.distance === maxDistance)
          r.score++
      })
    }

    let winner
    racers.forEach(r => {
      if (!winner || r.score > winner.score)
        winner = r
    })

    return winner.score
  }
}
