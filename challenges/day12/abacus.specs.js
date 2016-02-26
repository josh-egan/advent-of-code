import fs from 'fs'
import path from 'path'

import abacus from './abacus'

describe('abacus', function() {
  describe('addNumbersInString', function() {
    const testCases = [
      {input: '[1,2,3]', expectedOutput: 6},
      {input: '{"a":2,"b":4}', expectedOutput: 6},
      {input: '[[[3]]]', expectedOutput: 3},
      {input: '{"a":{"b":4},"c":-1}', expectedOutput: 3},
      {input: '{"a":[-1,1]}', expectedOutput: 0},
      {input: '[-1,{"a":1}]', expectedOutput: 0},
      {input: '[]', expectedOutput: 0},
      {input: '{}', expectedOutput: 0}
    ]
    testCases.forEach(test => {
      it(`input '${test.input}' should yield ${test.expectedOutput}`, function() {
        expect(abacus.addNumbersInString(test.input)).to.equal(test.expectedOutput)
      })
    })

    it('should solve the puzzle', function() {
	  const filePath = path.join(__dirname, 'challenge_input.json')
      const input = fs.readFileSync(filePath, 'utf8')
      expect(abacus.addNumbersInString(input)).to.eql(191164)
    })
  })
  
  describe('addNonRedNumbers', function() {
    const testCases = [
      {input: '[1,2,3]', expectedOutput: 6},
      {input: '{"a":2,"b":4}', expectedOutput: 6},
      {input: '[[[3]]]', expectedOutput: 3},
      {input: '{"a":{"b":4},"c":-1}', expectedOutput: 3},
      {input: '{"a":[-1,1]}', expectedOutput: 0},
      {input: '[-1,{"a":1}]', expectedOutput: 0},
      {input: '[]', expectedOutput: 0},
      {input: '{}', expectedOutput: 0},
      {input: '[1,{"c":"red","b":2},3]', expectedOutput: 4},
      {input: '{"d":"red","e":[1,2,3,4],"f":5}', expectedOutput: 0},
      {input: '[1,"red",5]', expectedOutput: 6},
    ]
    testCases.forEach(test => {
      it(`input '${test.input}' should yield ${test.expectedOutput}`, function() {
        expect(abacus.addNonRedNumbers(test.input)).to.equal(test.expectedOutput)
      })
    })

    it('should solve the puzzle', function() {
	  const filePath = path.join(__dirname, 'challenge_input.json')
      const input = fs.readFileSync(filePath, 'utf8')
      expect(abacus.addNonRedNumbers(input)).to.eql(87842)
    })
  })
})
