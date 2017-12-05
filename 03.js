'use strict'

function spiralCoordinates (n) {
  let t = n
  let p1 = Math.ceil(Math.sqrt(n))
  let x = 0
  let y = 0
  let dx = 0
  let dy = -1

  for (let i = 1; i <= n; i++) {
    if (i === n) {
      return [x,y]
    }

    if ((x === y) || ((x < 0) && (x === -y)) || ((x > 0) && (x === 1 - y))) {
      t = dx
      dx = -dy
      dy = t
    }

    x = x + dx
    y = y + dy
  }
}

function distance (a, b) {
  let distance = 0
  let dimensions = Math.max(a.length, b.length)

  for (let i = 0; i < dimensions; i++) {
    distance += Math.abs((b[i] || 0) - (a[i] || 0))
  }

  return distance
}

function getCoord (n) {
  const coords = spiralCoordinates(n)
  const d = distance([0,0], coords)

  return d
}

function spiralSum (n) {
  let t = n
  let p1 = Math.ceil(Math.sqrt(n))
  let mid = Math.ceil(p1 / 2) - 1
  let x = 0
  let y = 0
  let dx = 0
  let dy = -1

  const lat = new Array(p1)
  for (let i = 0; i < p1; i++) {
    lat[i] = new Array(p1)
  }

  for (let i = 1; i <= n; i++) {
    const adjX = x + mid
    const adjY = y + mid

    const above = lat[adjX][adjY + 1] || 0
    const below = lat[adjX][adjY - 1] || 0
    const besideL = lat[adjX - 1][adjY] || 0
    const besideR = lat[adjX + 1][adjY] || 0
    const diagonalTR = lat[adjX + 1][adjY + 1] || 0
    const diagonalBR = lat[adjX + 1][adjY - 1] || 0
    const diagonalTL = lat[adjX - 1][adjY + 1] || 0
    const diagonalBL = lat[adjX - 1][adjY - 1] || 0

    let sum = below + above + besideL + besideR + diagonalTR + diagonalBR + diagonalTL + diagonalBL

    if (sum === 0) {
      sum = 1
    }

    if (sum > n) {
      return sum
    }

    lat[adjX][adjY] = sum

    if ((x === y) || ((x < 0) && (x === -y)) || ((x > 0) && (x === 1 - y))) {
      t = dx
      dx = -dy
      dy = t
    }

    x = x + dx
    y = y + dy
  }
}

console.log(getCoord(325489))

console.log(spiralSum(325489))
