import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Login = () => {
  const { disable, verifyEmail, verifyPassword, handleLogin, verifyLogin } = useContext(UserContext);

  if (verifyLogin) return <Redirect to="/comidas" />;
  return (
    <>
      <h1>login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={ verifyEmail }
        data-testid="email-input"
      />

      <input
        type="password"
        data-testid="password-input"
        onChange={ verifyPassword }
        placeholder="Password"
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disable }
        onClick={ handleLogin }
      >
        Entrar
      </button>
    </>
  );
};

export default Login;
