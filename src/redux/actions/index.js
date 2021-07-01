import FETCH_API from './actionTypes';

const fetchApiAction = (payload) => ({
  type: FETCH_API,
  payload,
});

export default fetchApiAction;
