const voteWinner = (vote) => {
  if (!vote) return [];
  const [a, b] = vote.pair;
  const {[a]: aVotes=0, [b]: bVotes=0} = vote.tally;
  if (aVotes > bVotes) return [a];
  if (aVotes < bVotes) return [b];
  else return [a, b];
}

const next = ({ entries, vote } = {}) => {
  entries = [...entries, ...voteWinner(vote)];
  if (entries.length === 1) {
    return { winner: entries[0] }; 
  };
  let first, second;
  [first, second, ...entries] = entries;
  return {
    entries: entries,
    vote: { pair: [first, second] }
  };
}

const voteFor = ({ pair, tally={} }, receiver) => {
  let { [receiver]: count=0, ...tally} = tally;
  return {
    pair: pair, 
    tally: {[receiver]: count + 1, ...tally }
  };
}

export default (
  state = { entries: [] }, { type, payload } = {} ) => {

  switch (type) {
    case 'SET_ENTRIES':
      return { entries: payload };
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return { ...state, vote: voteFor(state.vote, payload)  };
    default:
      return state;
  }
};
