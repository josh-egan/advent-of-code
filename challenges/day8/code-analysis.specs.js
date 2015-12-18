import codeAnalyzer from './code-analysis'

describe('code analysis', function() {

  describe('strings', function() {
    it(`should correctly run string calculations`, async function() {
      let result = await codeAnalyzer.strings('test.txt')
      expect(result).to.eql(12)
    })

    it(`should solve the puzzle`, async function() {
      let result = await codeAnalyzer.strings('strings.txt')
      expect(result).to.eql(1333)
    })
  })

  describe('strings v2', function() {
    it(`should correctly run string calculations`, async function() {
      let result = await codeAnalyzer.strings2('test.txt')
      expect(result).to.eql(19)
    })

    it(`should solve the puzzle`, async function() {
      let result = await codeAnalyzer.strings2('strings.txt')
      expect(result).to.eql(2046)
    })
  })
})
