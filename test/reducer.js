import test from 'tape';
import deepFreeze from 'deep-freeze';

import reducer from '../src/reducer';

test('reducer', nest => {
  nest.test('...initial', assert => {
    const expected = {entries: []};
    const actual = reducer();

    assert.deepEqual(actual, expected, "returns a list of empty entries");
    assert.end();
  });

  nest.test('...SET_ENTRIES', assert => {
    const stateBefore = { entries: ["Aliens"] };
    const action = {
      type: 'SET_ENTRIES',
      payload: ['Trainspotting', '28 Days Later']
    };
    const expected = { entries: ['Trainspotting', '28 Days Later'] };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, "replaces any existing entries");
    assert.end();
  });

  nest.test('...NEXT', assert => {
    const msg = 'sets a voting pair, removing first 2 entries from the list';
    const stateBefore = { 
      entries: ['Trainspotting', '28 Days Later', 'Alien']
    };
    const action = { type: 'NEXT' };
    const expected = { 
      entries: ['Alien'],
      vote: { pair: ['Trainspotting', '28 Days Later'] }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('...NEXT, with an active voting pair', assert => {
    const msg = 'adds pair w/highest tally to end of entries; sets next pair';
    const stateBefore = { 
      entries: ['Alien', 'Twister'],
      vote: { 
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 2, '28 Days Later': 1 }
      }
    };
    const action = { type: 'NEXT' };
    const expected = { 
      entries: ['Trainspotting'],
      vote: { pair: ['Alien', 'Twister'] }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('...NEXT, with a tied voting pair', assert => {
    const msg = 'adds both pairs to end of entries; sets next pair';
    const stateBefore = { 
      entries: ['Alien'],
      vote: { 
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 2, '28 Days Later': 2 }
      }
    };
    const action = { type: 'NEXT' };
    const expected = { 
      entries: ['28 Days Later'],
      vote: { pair: ['Alien', 'Trainspotting'] }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('...NEXT, with one entry remaining', assert => {
    const msg = 'returns that entry as the Winner';
    const stateBefore = { 
      entries: [],
      vote: { 
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 2, '28 Days Later': 1 }
      }
    };
    const action = { type: 'NEXT' };
    const expected = { 
      winner: 'Trainspotting',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('...VOTE, when neither pair has a vote', assert => {
    const msg = "sets receiver's tally to 1 and the other's to 0";

    const stateBefore = { 
      entries: [],
      vote: { pair: ['Trainspotting', '28 Days Later'] }
    };
    const action = { type: 'VOTE', payload: 'Trainspotting' };
    const expected = { 
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 1 }
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });

  nest.test('...VOTE, when both pairs have votes', assert => {
    const msg = "increments only the receiver's tally";

    const stateBefore = { 
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 2, '28 Days Later': 1 }
      }
    };
    const action = { type: 'VOTE', payload: '28 Days Later' };
    const expected = { 
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { 'Trainspotting': 2, '28 Days Later': 2 }
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    const actual = reducer(stateBefore, action);
    assert.deepEqual(actual, expected, msg);
    assert.end();
  });
});
