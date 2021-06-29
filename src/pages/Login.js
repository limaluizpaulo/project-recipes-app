import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');

  const maxLength = 6;
  const isValid = email.match(/((\w+)@(\w+)\.(\w+))/i) && password.length > maxLength;
  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          value={ email }
          type="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          id="password"
          value={ password }
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassoword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isValid }
      >
        Login
      </button>
    </div>
  );
};

export default Login;
