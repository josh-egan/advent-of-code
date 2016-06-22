export default {
  solveTSP(input) {
    // https://en.wikipedia.org/wiki/Travelling_salesman_problem
    if (!input || input.length === 0) return 0

    let graph = buildGraph(input)

    let nodes = Object.keys(graph)
    let shortestDistance = 0
    nodes.forEach(n => {
      shortestDistance += graph[n].edges[0].distance
    })

    nodes.forEach(n => {
      let nodesVisited = {}
      let totalDistance = 0
      let result = searchForShortestRoute(n, graph, nodesVisited, totalDistance)
      if (result.didVisitAllNodes && result.total < shortestDistance)
        shortestDistance = result.total
    })

    return shortestDistance
  },

  solveLongestTSP(input) {
    let graph = buildGraph(input)

    let nodes = Object.keys(graph)
    let longestDistance = 0

    nodes.forEach(n => {
      let nodesVisited = {}
      let totalDistance = 0
      let result = searchForLongestRoute(n, graph, nodesVisited, totalDistance)
      if (result.didVisitAllNodes && result.total > longestDistance)
        longestDistance = result.total
    })

    return longestDistance
  }
}

function searchForShortestRoute(n, graph, nodesVisited, totalDistance) {
  nodesVisited[n] = true
  let shortestResult
  let edges = graph[n].edges
  for (var i = 0; i < edges.length; i++) {
    let edge = edges[i]
    if (nodesVisited[edge.id]) continue
    let result = searchForShortestRoute(edge.id, graph, nodesVisited, totalDistance + edge.distance)
    if (shortestResult === undefined || result.total < shortestResult.total) shortestResult = result
  }

  let didVisitAllNodes = Object.keys(nodesVisited).length === Object.keys(graph).length || (shortestResult && shortestResult.didVisitAllNodes)
  let total = shortestResult !== undefined ? shortestResult.total : totalDistance
  delete nodesVisited[n]
  return {total, didVisitAllNodes}
}

function searchForLongestRoute(n, graph, nodesVisited, totalDistance) {
  nodesVisited[n] = true
  let longestResult
  let edges = graph[n].edges
  for (var i = 0; i < edges.length; i++) {
    let edge = edges[i]
    if (nodesVisited[edge.id]) continue
    let result = searchForLongestRoute(edge.id, graph, nodesVisited, totalDistance + edge.distance)
    if (longestResult === undefined || result.total > longestResult.total) longestResult = result
  }

  let didVisitAllNodes = Object.keys(nodesVisited).length === Object.keys(graph).length || (longestResult && longestResult.didVisitAllNodes)
  let total = longestResult !== undefined ? longestResult.total : totalDistance
  delete nodesVisited[n]
  return {total, didVisitAllNodes}
}

function buildGraph(input) {
  let graph = {}
  input.forEach(i => {
    let parts = i.split('=')
    let cities = parts[0].split('to')
    let distance = Number.parseInt(parts[1].trim())

    let c0 = cities[0].trim()
    let c1 = cities[1].trim()
    if (!graph[c0]) graph[c0] = new Node(c0)
    if (!graph[c1]) graph[c1] = new Node(c1)

    graph[c0].addEdge(c1, distance)
    graph[c1].addEdge(c0, distance)
  })
  return graph
}

class Node {
  edges = []

  constructor(id) {
    this.id = id
  }

  addEdge(id, distance) {
    this.edges.push({id, distance})
  }
}
