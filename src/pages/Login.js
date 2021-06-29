import React from 'react';

export default function Login() {
  return (
    <div>
      Email:
      <input
        type="text"
        data-testid="email-input"
      />
      Senha:
      <input
        type="password"
        data-testid="password-input"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}
