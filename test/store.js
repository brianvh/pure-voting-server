import test from 'tape';

import makeStore from '../src/store';
import { setEntries, next, vote } from '../src/actions';

test('initializing the store', (assert) => {
  const expected = {entries: []};
  const actual = makeStore().getState();

  assert.deepEqual(actual, expected, "returns a set of empty entries");
  assert.end();
});

test('dispatching actions', (nest) => {
  nest.test('...setEntries', (assert) => {
    const store = makeStore();

    store.dispatch(setEntries("Trainspotting", "28 Days Later"));

    const expected = {entries: ["Trainspotting", "28 Days Later"]};
    const actual = store.getState();

    assert.deepEqual(actual, expected, "adds new titles to the entries");
    assert.end();
  });

  nest.test('...a full multi-action run', assert => {
    const actions = [
      setEntries("Trainspotting", "28 Days Later"),
      next(),
      vote('Trainspotting'),
      vote('28 Days Later'),
      vote('Trainspotting'),
      next()
    ];
    const store = makeStore();
    actions.forEach(store.dispatch);

    const expected = { winner: 'Trainspotting' };
    const actual = store.getState();

    assert.deepEqual(actual, expected, "results in a winner");
    assert.end();
  });
});
