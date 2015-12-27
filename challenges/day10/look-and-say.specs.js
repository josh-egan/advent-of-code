import lookAndSay from './look-and-say'

describe('lookAndSay', function() {
  describe('solveTSP', function() {
    const testCases = [
      {input: '1', cycles: 1, expectedOutput: '11'},
      {input: '11', cycles: 1, expectedOutput: '21'},
      {input: '21', cycles: 1, expectedOutput: '1211'},
      {input: '1211', cycles: 1, expectedOutput: '111221'},
      {input: '111221', cycles: 1, expectedOutput: '312211'},
      {input: '1', cycles: 5, expectedOutput: '312211'},
    ]
    testCases.forEach(test => {
      it(`input '${test.input}' should yield ${test.expectedOutput}`, function() {
        expect(lookAndSay.play(test.input, test.cycles)).to.equal(test.expectedOutput)
      })
    })

    it.skip('should solve the puzzle', function() {
      const input = '1321131112'
      const cycles = 40
      expect(lookAndSay.play(input, cycles).length).to.eql(492982)
    })

    it.skip('should solve the 2nd puzzle', function() {
      this.timeout(10000)
      const input = '1321131112'
      const cycles = 50
      expect(lookAndSay.play(input, cycles).length).to.eql(6989950)
    })
  })
})
