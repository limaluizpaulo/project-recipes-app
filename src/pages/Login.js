import React, { useState, useEffect } from 'react';

const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    const passMin = 6;
    const { email, password } = user;
    setValidation((email.match(REGEX_EMAIL) && password.length >= passMin));
  }, [user]);

  function handleInputChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }

  return (
    <div>
      Email:
      <input
        name="email"
        type="text"
        data-testid="email-input"
        onChange={ handleInputChange }
      />
      Senha:
      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ handleInputChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !validation }
      >
        Entrar
      </button>
    </div>
  );
}
