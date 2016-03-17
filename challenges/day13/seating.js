// There must be an algorithm / data structure for solving this quickly.
// However, not knowing what that algorithm is, here goes brute force...

function parseInput(inputArray) {
  let seatingPreferences = {}
  inputArray.forEach(line => {
    line = line.replace('.', '')
    let parts = line.split(' ')
    let subject = parts[0]
    let gainOrLose = parts[2]
    let amount = parseInt(parts[3])
    let target = parts[parts.length - 1]

    if (typeof seatingPreferences[subject] !== 'object'){
      seatingPreferences[subject] = {}
    }

    let change = gainOrLose === 'gain' ? amount : amount * -1
    seatingPreferences[subject][target] = change
  })

  return seatingPreferences
}

function getPossibleSeatingArrangements(seatingPreferences) {
  let keys = Object.keys(seatingPreferences)
  let firstKey = keys.shift()
  let permutations = getPermutations(keys)
  permutations.forEach(p => p.unshift(firstKey))
  return permutations
}

function getPermutations (inputs) {
  if (inputs.length < 2)
    return [inputs];

  return inputs.reduce(function(prev, current) {
    return prev.concat(
      getPermutations(inputs.filter(function(x) { return x != current; }))
          .map(function(x) { return [current].concat(x); }));
  }, []);
};

function getOptimalSeatingArrangement(seatingPreferences, possibleSeatingArrangements) {
  let optimal

  possibleSeatingArrangements.forEach(seatingArrangement => {
    let totalChange = 0
    for (let i = 0; i < seatingArrangement.length; i++) {
      let p2Index = i + 1 < seatingArrangement.length ? i + 1 : 0
      let p1 = seatingArrangement[i]
      let p2 = seatingArrangement[p2Index]

      totalChange += seatingPreferences[p1][p2]
      totalChange += seatingPreferences[p2][p1]
    }

    if (!optimal || totalChange > optimal.totalChange) {
      optimal = { seatingArrangement, totalChange }
    }
  })

  return optimal
}

export default {
  calculateTotalChangeInHappiness(inputArray) {
    let seatingPreferences = parseInput(inputArray)
    let possibleSeatingArrangements = getPossibleSeatingArrangements(seatingPreferences)
    let optimalSeatingArrangement = getOptimalSeatingArrangement(seatingPreferences, possibleSeatingArrangements)
    return optimalSeatingArrangement.totalChange
  }
}
