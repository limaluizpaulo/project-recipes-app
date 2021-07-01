export const USERLOGIN = 'USERLOGIN';

export function userLogin(payload) {
  return {
    type: USERLOGIN,
    payload,
  };
}
