import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core.js'

describe('application logic', () => {

  describe('setEntries', () => {

    it('add entries to the state', () => {
      const state     = Map()
      const entries   = List.of('Trainspotting', '28 Days Later')
      const nextState = setEntries(state, entries)
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }))
    })

    it('convert to immutable', () => {
      const state     = Map();
      const entries   = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    })

  })

  describe('next', () => {
    it('take the next two entries under vote', () => {
      const state = Map ({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      })
      const nextState = next(state)
      expect(nextState).to.be.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }))
    })
  })

  describe('vote', () => {
    it('create tally for voting entry', () => {
      const state = Map ({
        vote: Map ({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List()
      })
      const nextState = vote (state, 'Trainspotting')
      expect(nextState).to.equal(Map({
        vote: Map ({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }))
    })

    it('add exisiting tally to the voted entry', () => {
      const state = Map ({
        vote: Map ({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map ({
            'Trainspotting': 2,
            '28 Days Later': 2
          })
        }),
        entries: List()
      })
      const nextState = vote (state, '28 Days Later')
      expect(nextState).to.be.equal(Map ({
        vote: Map ({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map ({
            'Trainspotting': 2,
            '28 Days Later': 3
          })
        }),
        entries: List()
      }))
    })

  })

})
