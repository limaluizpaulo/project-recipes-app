import { SAVE_USER } from './types';

export const actionSaveUser = (email) => ({
  type: SAVE_USER,
  payload: {
    email,
  },
});

export const actionGetUser = (email) => ({
  type: 'GET_USER',
  payload: {
    email,
  },
});

// export const actionModelThunk = () => (dispatch) => (
//   // //apiQuestionsRequest()
//   //   .then((data) => dispatch({
//   //     type: 'FETCH_GAME_DATA',
//   //     payload: {
//   //       data,
//   //     },
//     // }))
// );
