import _ from 'lodash'

export default {
  countLitLights(instructions) {
    let transforms = {
      on: () => 1,
      off: () => 0,
      toggle: b => b == 0 ? 1 : 0
    }

    let lightsGrid = getFinalLightGrid(instructions, transforms)

    let counts = _.countBy(_.flatten(lightsGrid), brightness => brightness == 1)
    return counts.true || 0
  },

  countTotalBrightness(instructions) {
    let transforms = {
      on: b => b + 1,
      off: b => b > 0 ? b - 1 : 0,
      toggle: b => b + 2
    }

    let lightsGrid = getFinalLightGrid(instructions, transforms)

    let totalBrightness = _.flatten(lightsGrid).reduce((prev, cur) => {
      return prev + cur
    }, 0)

    return totalBrightness
  }
}

function getFinalLightGrid(instructions, transforms) {
  if (!instructions || instructions.length === 0) return []

  let lightsGrid = createGrid()

  instructions.forEach(instruction => {
    let parsedOperation = parseInstruction(instruction, transforms)
    parsedOperation(lightsGrid)
  })

  return lightsGrid
}

function createGrid() {
  let grid = []
  for (var x = 0; x < 1000; x++) {
    grid[x] = []
    for (var y = 0; y < 1000; y++) {
      grid[x][y] = 0
    }
  }
  return grid
}

function parseInstruction(instruction, transforms) {
  let transform
  let parsedInstruction = instruction.slice(0)
  if (_.startsWith(parsedInstruction, 'turn on')) {
    parsedInstruction = parsedInstruction.replace('turn on', '')
    transform = transforms.on
  }
  else if (_.startsWith(parsedInstruction, 'turn off')) {
    parsedInstruction = parsedInstruction.replace('turn off', '')
    transform = transforms.off
  }
  else if (_.startsWith(parsedInstruction, 'toggle')) {
    parsedInstruction = parsedInstruction.replace('toggle', '')
    transform = transforms.toggle
  }
  else {
    throw new Error('unexpected instruction! ', instruction)
  }

  let coordinates = parsedInstruction.split('through')
  let topLeftCoordinates = coordinates[0].split(',')
  let bottomRightCoordinates = coordinates[1].split(',')

  let topLeft = {
    x: Number.parseInt(topLeftCoordinates[0].trim()),
    y: Number.parseInt(topLeftCoordinates[1].trim())
  }

  let bottomRight = {
    x: Number.parseInt(bottomRightCoordinates[0].trim()),
    y: Number.parseInt(bottomRightCoordinates[1].trim())
  }

  return grid => operateOnGrid(grid, topLeft, bottomRight, transform)
}

function operateOnGrid(grid, topLeft, bottomRight, transform) {
  for (var x = topLeft.x; x <= bottomRight.x; x++) {
    for (var y = topLeft.y; y <= bottomRight.y; y++) {
      grid[x][y] = transform(grid[x][y])
    }
  }
}
