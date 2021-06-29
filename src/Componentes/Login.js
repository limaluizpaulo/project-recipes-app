import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email-input">
          <input type="email" id="email-input" data-testid="email-input" />
          E-mail
        </label>
        <label htmlFor="password-input">
          <input type="password" id="password-input" data-testid="password-input" />
          Senha
        </label>
        <button type="submit" data-testid="login-submit-btn">
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
