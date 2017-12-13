'use strict'

const fs = require('fs')
const readline = require('readline')

function permut (string) {
  if (string.length < 2) return string

  const permutations = []

  for (let i = 0; i < string.length; i++) {
    const char = string[i]

    if (string.indexOf(char) === i) {
      const remainingString = string.slice(0, i) + string.slice(i + 1, string.length)

      for (let subPermutation of permut(remainingString))
        permutations.push(char + subPermutation)
    }
  }

  return permutations
}

function part1 (cb) {
  let validPasswords = 0

  const rl = readline.createInterface({
    input: fs.createReadStream('04.txt', 'utf8')
  })

  rl.on('line', line => {
    const words = line.split(' ')
    const unique = Array.from(new Set(words))

    if (words.length === unique.length) {
      validPasswords += 1
    }
  })

  rl.on('close', () => {
    cb(validPasswords)
  })
}

function part2 (cb) {
  let validPasswords = 0

  const rl = readline.createInterface({
    input: fs.createReadStream('04.txt', 'utf8')
  })

  rl.on('line', line => {
    const words = line.split(' ')
    const unique = Array.from(new Set(words))

    if (words.length === unique.length) {
      let isValid = true

      unique.forEach((word, index) => {
        const perms = permut(word)

        unique.forEach((w2, i2) => {
          if (index === i2) {
            return
          }

          if (perms.indexOf(w2) > 0) {
            isValid = false
          }
        })
      })

      if (isValid) {
        validPasswords += 1
      }
    }
  })

  rl.on('close', () => {
    cb(validPasswords)
  })
}

part1(res => console.log(res))
part2(res => console.log(res))
