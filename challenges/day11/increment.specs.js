import increment from './increment'

describe('increment', function() {
  describe('string', function() {
    const testCases = [
      {input: '', expectedOutput: 'a'},
      {input: 'A', expectedOutput: 'b'},
      {input: 'a', expectedOutput: 'b'},
      {input: 'b', expectedOutput: 'c'},
      {input: 'c', expectedOutput: 'd'},
      {input: 'y', expectedOutput: 'z'},
      {input: 'z', expectedOutput: 'aa'},
      {input: 'aa', expectedOutput: 'ab'},
      {input: 'az', expectedOutput: 'ba'},
      {input: 'zz', expectedOutput: 'aaa'},
      {input: 'abc', expectedOutput: 'abd'},
    ]

    testCases.forEach(testCase => {
      it(`should increment '${testCase.input}' to '${testCase.expectedOutput}'`, function() {
        expect(increment.string(testCase.input)).to.equal(testCase.expectedOutput)
      })
    })

    it('should throw if an unexpected character is in the increment position', function() {
      expect(() => increment.string('*')).to.throw(/unexpected character/)
    })
  })
})
