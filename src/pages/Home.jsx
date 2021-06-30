import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <main>
        <label htmlFor="input-Email">
          <input
            types="text"
            placeholder="Email"
            id="input-Email"
            data-testid="email-input"
            name="email"
          />
        </label>
        <label htmlFor="input-Password">
          <input
            type="password"
            placeholder="Password"
            id="input-Password"
            data-testid="password-input"
            name="password"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </main>
    );
  }
}
export default Home;
