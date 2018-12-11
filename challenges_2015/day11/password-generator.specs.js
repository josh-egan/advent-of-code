import passwordGenerator from './password-generator'

describe('password-generator', function() {
  describe.skip('getNextPassword', function() {

    this.timeout(10000)

    const testCases = [
      {input: 'abcdefgh', expectedOutput: 'abcdffaa'},
      {input: 'ghijklmn', expectedOutput: 'ghjaabcc'}
    ]

    testCases.forEach(testCase => {
      it(`should get the next password '${testCase.input}' to '${testCase.expectedOutput}'`, function() {
        expect(passwordGenerator.getNextPassword(testCase.input)).to.equal(testCase.expectedOutput)
      })
    })

    it('should solve the puzzle', function() {
      expect(passwordGenerator.getNextPassword('hepxcrrq')).to.equal('hepxxyzz')
    })

    it('should solve the 2nd puzzle', function() {
      expect(passwordGenerator.getNextPassword('hepxxyzz')).to.equal('heqaabcc')
    })
  })
})
