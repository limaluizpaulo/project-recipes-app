import React, { useState } from 'react';
import { Redirect } from 'react-router';

export default function Login() {
  const [state, setState] = useState({ email: '', password: '', redirect: false });

  const handleValue = ({ target }) => {
    const { name } = target;
    setState({ ...state, [name]: target.value });
  };

  const handleEmailverify = () => {
    const { email } = state;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = state;
    const user = {
      email,
    };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    setState({ ...state, redirect: true });
  };

  const { email, password } = state;
  if (state.redirect) return <Redirect to="/comidas" />;
  const NUM = 6;

  return (

    <section className="login-section">
      <div className="login-container">
        <form onSubmit={ handleSubmit }>
          {/* <label htmlFor="email">
          Email */}
          <input
            value={ email }
            name="email"
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ handleValue }
            placeholder="Email"
          />
          {/* </label> */}
          {/* <label htmlFor="password">
          Password */}
          <input
            value={ password }
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ handleValue }
            placeholder="Senha"
          />
          {/* </label> */}
          <button
            data-testid="login-submit-btn"
            disabled={ password.length <= NUM || (!handleEmailverify()) }
            type="submit"
            className="btn btn-success"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>

  );
}
