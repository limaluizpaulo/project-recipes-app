import React from 'react';

export default function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        type="text"
      />
      <input
        data-testid="password-input"
        type="text"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar
      </button>
    </form>
  );
}
