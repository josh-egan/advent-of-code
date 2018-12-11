import reindeer from './reindeer'

describe('reindeer', function () {
  describe('race', function () {
    const testCases = [
      {
        contestants: [{
            name: 'Comet',
            speed: 14,
            sprintTime: 10,
            restTime: 127
        }, {
            name: 'Dancer',
            speed: 16,
            sprintTime: 11,
            restTime: 162
        }
      ],
        raceDuration: 1000,
        expectedOutput: 1120
      }
    ]
    testCases.forEach(test => {
      it(`contestants ['${test.contestants[0]}', ...] should yield ${test.expectedOutput}`, function () {
        expect(reindeer.race(test.contestants, test.raceDuration)).to.equal(test.expectedOutput)
      })
    })

    it('should solve the puzzle', function () {
      const contestants = [{
          name: 'Rudolph',
          speed: 22,
          sprintTime: 8,
          restTime: 165
        }, {
          name: 'Cupid',
          speed: 8,
          sprintTime: 17,
          restTime: 114
        }, {
          name: 'Prancer',
          speed: 18,
          sprintTime: 6,
          restTime: 103
        }, {
          name: 'Donner',
          speed: 25,
          sprintTime: 6,
          restTime: 145
        }, {
          name: 'Dasher',
          speed: 11,
          sprintTime: 12,
          restTime: 125
        }, {
          name: 'Comet',
          speed: 21,
          sprintTime: 6,
          restTime: 121
        }, {
          name: 'Blitzen',
          speed: 18,
          sprintTime: 3,
          restTime: 50
        }, {
          name: 'Vixen',
          speed: 20,
          sprintTime: 4,
          restTime: 75
        }, {
          name: 'Dancer',
          speed: 7,
          sprintTime: 20,
          restTime: 119
        }
      ]
      let raceDuration = 2503
      expect(reindeer.race(contestants, raceDuration)).to.eql(2696)
    })
  })

  describe('raceBySecond', function () {
    const testCases = [
      {
        contestants: [{
            name: 'Comet',
            speed: 14,
            sprintTime: 10,
            restTime: 127
        }, {
            name: 'Dancer',
            speed: 16,
            sprintTime: 11,
            restTime: 162
        }
      ],
        raceDuration: 1000,
        expectedOutput: 689
      }
    ]
    testCases.forEach(test => {
      it(`contestants ['${test.contestants[0]}', ...] should yield ${test.expectedOutput}`, function () {
        expect(reindeer.raceBySecond(test.contestants, test.raceDuration)).to.equal(test.expectedOutput)
      })
    })

    it('should solve the 2nd puzzle', function () {
      const contestants = [{
          name: 'Rudolph',
          speed: 22,
          sprintTime: 8,
          restTime: 165
            }, {
          name: 'Cupid',
          speed: 8,
          sprintTime: 17,
          restTime: 114
            }, {
          name: 'Prancer',
          speed: 18,
          sprintTime: 6,
          restTime: 103
            }, {
          name: 'Donner',
          speed: 25,
          sprintTime: 6,
          restTime: 145
            }, {
          name: 'Dasher',
          speed: 11,
          sprintTime: 12,
          restTime: 125
            }, {
          name: 'Comet',
          speed: 21,
          sprintTime: 6,
          restTime: 121
            }, {
          name: 'Blitzen',
          speed: 18,
          sprintTime: 3,
          restTime: 50
            }, {
          name: 'Vixen',
          speed: 20,
          sprintTime: 4,
          restTime: 75
            }, {
          name: 'Dancer',
          speed: 7,
          sprintTime: 20,
          restTime: 119
            }
          ]
      let raceDuration = 2503
      expect(reindeer.raceBySecond(contestants, raceDuration)).to.eql(1084)
    })
  })
})
