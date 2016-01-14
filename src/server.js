import Server from 'socket.io';

export default (store, debug=false) => {
  const io = new Server().attach(8090);
  if (debug) console.log('Server listening on port 8090');

  // store.subscribe(
  //   () => io.emit('state', store.getState())
  // );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState());
    // socket.on('action', (action) => store.dispatch(action));
  });
}
