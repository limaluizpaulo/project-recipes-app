import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Login = () => {
  const { handleChange,
    validationUser,
    handleLogin,
    verifyLogin } = useContext(UserContext);

  if (verifyLogin) return <Redirect to="/comidas" />;
  return (
    <section>
      <h1>login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={ handleChange }
        data-testid="email-input"
      />

      <input
        type="password"
        data-testid="password-input"
        onChange={ handleChange }
        placeholder="Password"
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validationUser() }
        onClick={ handleLogin }
      >
        Entrar
      </button>
    </section>
  );
};

export default Login;
