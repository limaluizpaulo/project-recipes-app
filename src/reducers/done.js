const INITIAL_STATE = {
  allDone: [],
};

function done(state = INITIAL_STATE, { type, value }) {
  switch (type) {
  case 'FINISHED':
    return ({
      ...state,
      allDone: [...state.allDone, value],
    });
  default:
    return state;
  }
}

export default done;
