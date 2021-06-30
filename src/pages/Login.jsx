import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const initialState = {
  email: '',
  password: '',
};

export default function Login() {
  const [loginState, setLoginState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    const { email, password } = loginState;
    const regex = /\S+@\S+\.\S+/;
    const min = 6;
    if (regex.test(email) && password.length > min) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [loginState]);

  const submit = () => {
    const { email } = loginState;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/comidas" /> : (
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
      <Button
        variant={ isDisabled ? 'danger' : 'success' }
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ submit }
      >
        Entrar
      </Button>
    </form>
  );
}
