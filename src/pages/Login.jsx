import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      email: '',
      password: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
    this.handleLogin();
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
    this.handleLogin();
  }

  handleLogin() {
    const { email, password } = this.state;
    const passwordLength = 6;
    if (
      email.match(/((\w+)@(\w+)\.(\w+))/i)
      && password.length >= passwordLength
    ) {
      this.setState((value) => ({ active: !value }));
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <label htmlFor="email">
          <input onChange={ this.handleEmail } type="text" data-testid="email-input" />
        </label>
        <label htmlFor="password">
          <input
            onChange={ this.handlePassword }
            type="password"
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ active }
          data-testid="login-submit-btn"
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
