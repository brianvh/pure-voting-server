export const setEntries = (...entries) => {
  return {
    type: 'SET_ENTRIES',
    payload: entries
  };
}

export const next = () => {
  return {
    type: 'NEXT'
  };
}

export const vote = (entry) => {
  return {
    type: 'VOTE',
    payload: entry
  };
}
