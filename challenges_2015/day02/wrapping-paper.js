function getDimensions(box) {
  return box.split('x').map(n => Number.parseInt(n))
}
function getWrappingPaperForBox(box) {
  let dimensions = getDimensions(box)
  let surfaces = [dimensions[0] * dimensions[1], dimensions[1] * dimensions[2], dimensions[2] * dimensions[0]]
  let smallestSurface = Math.min(...surfaces)
  let surfaceArea = surfaces.reduce((prev, cur) => { return prev + cur * 2}, 0)
  return surfaceArea + smallestSurface
}

function getRibbonForBox(box) {
  let dimensions = getDimensions(box)
  let largestDimension = Math.max(...dimensions)
  let smallestDimensions = dimensions.slice(0)
  smallestDimensions.splice(dimensions.indexOf(largestDimension), 1)
  let perimeter = smallestDimensions.reduce((prev, cur) => {return prev + cur * 2}, 0)
  let volume = dimensions[0] * dimensions[1] * dimensions[2]
  return perimeter + volume
}

export default {
  getWrappingPaperForBoxes(boxes) {
    return boxes.reduce((prev, cur) => {
      return prev + getWrappingPaperForBox(cur)
    }, 0)
  },

  getRibbonForBoxes(boxes) {
    return boxes.reduce((prev, cur) => {
      return prev + getRibbonForBox(cur)
    }, 0)
  }
}
