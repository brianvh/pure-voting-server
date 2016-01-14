import startServer from './src/server';
import makeStore from './src/store';

const store = makeStore();
store.dispatch({
  type: 'SET_ENTRIES',
  payload: ['Trainspotting', '28 Days Later']
});
store.dispatch({type: 'NEXT'});

startServer(store, true);
