import React, { useState, useEffect } from 'react';

const initialState = {
  email: '',
  password: '',
};

export default function Login() {
  const [loginState, setLoginState] = useState(initialState);
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    const { email, password } = loginState;
    const regex = /\S+@\S+\.\S+/;
    const min = 6;
    if (regex.test(email) && password.length > min) {
      setIsDisable(false);
    } else setIsDisable(true);
  }, [loginState]);

  return (
    <form>
      <input
        data-testid="email-input"
        type="text"
        onChange={
          ({ target: { value } }) => setLoginState({ ...loginState, email: value })
        }
      />
      <input
        data-testid="password-input"
        type="password"
        onChange={
          ({ target: { value } }) => setLoginState({ ...loginState, password: value })
        }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisable }
      >
        Entrar
      </button>
    </form>
  );
}
