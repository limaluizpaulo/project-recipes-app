import React, { useState } from 'react';
import useValidation from '../hooks/useValidation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, checkEmail, checkPassword } = useValidation();
  const handleInputChange = (setter, checker, value) => {
    setter(value);
    checker(value);
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => handleInputChange(setEmail, checkEmail, value) }
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => handleInputChange(setPassword, checkPassword, value) }
          type="password"
          name="password"
          placeholder="Senha"
        />
      </div>
      <button data-testid="login-submit-btn" disabled={ error } type="button">Entrar</button>
    </div>
  );
};

export default Login;
