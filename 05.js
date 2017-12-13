'use strict'

// This solution uses tail-call optimization so you need to use a version of
// node that supports that (v7.10.0)
//
// node --harmony 05.js

const fs = require('fs')

function takeSteps (index, arr, steps) {
  if (index >= arr.length) {
    return steps
  } else {
    const nextIndex = arr[index] + index

    if (arr[index] >= 3) {
      arr[index] -= 1
    } else {
      arr[index] += 1
    }

    return takeSteps(nextIndex, arr, steps + 1)
  }
}

function part1 () {
  const file = fs.readFileSync('05.txt', 'utf8')
  const arr = file.split('\n').filter(i => i !== '')
  const steps = arr.map(i => Number(i))

  const numSteps = takeSteps(0, steps, 0)

  return numSteps
}

console.log(part1())
