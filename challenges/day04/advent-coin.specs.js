import adventCoin from './advent-coin'

describe('advent coin', function() {

  this.timeout(60000)

  describe.skip('get smallest int', function() {
    const testCases = [
      {input: 'abcdef', expectedOutput: 609043},
      {input: 'pqrstuv', expectedOutput: 1048970},
      {input: 'bgvyzdsv', expectedOutput: 254575},
    ]
    testCases.forEach(test => {
      it(`input '${test.input}' should yield ${test.expectedOutput}`, function() {
        expect(adventCoin.getSmallestIntForHashStartingWith(test.input, '00000')).to.equal(test.expectedOutput)
      })
    })

    const testCases2 = [
      {input: 'bgvyzdsv', expectedOutput: 1038736},
    ]
    testCases2.forEach(test => {
      it(`input '${test.input}' should yield ${test.expectedOutput}`, function() {
        expect(adventCoin.getSmallestIntForHashStartingWith(test.input, '000000')).to.equal(test.expectedOutput)
      })
    })
  })
})
