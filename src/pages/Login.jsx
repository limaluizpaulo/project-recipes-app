import React, { useState, useContext } from 'react';

function Login() {
  return (
    <>
      <label htmlFor="email-input">
        <input id="email-input" type="email" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        <input id="password-input" type="pasword" data-testid="password-input" />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
