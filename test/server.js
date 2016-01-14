import test from 'tape';
import io from 'socket.io-client';

test('Socket.io server', nest => {
  nest.test('...when a client first connects', assert => {
    const options = {
      reconnection: false,
      forceNew: true
    };
    const socket = io.connect('http://localhost:8090', options);
    
    const expected = {
      entries: [],
      vote: { pair: [ 'Trainspotting', '28 Days Later' ] }
    };
    socket.on('state', (actual) => {
      assert.deepEqual(actual, expected, "returns the current server state");
      socket.disconnect();
    });
    assert.end();
  });

  nest.test('...when a client sends an action', assert => {
    const options = {
      reconnection: false,
      forceNew: true
    };

    const action = {
      type: 'VOTE',
      payload: 'Trainspotting'
    };
    const expected = {
      entries: [],
      vote: {
        pair: [ 'Trainspotting', '28 Days Later' ],
        tally: { 'Trainspotting': 1 }
      }
    };
    let actual = {}, count = 0;

    const socket = io.connect('http://localhost:8090', options);
    socket.emit('action', action);
    socket.on('state', (payload) => {
      count = count + 1;
      actual = payload;
      if (count === 2) {
        socket.disconnect();
        assert.deepEqual(actual, expected, "returns the new state");
      };
    });

    assert.end();
  });
});
