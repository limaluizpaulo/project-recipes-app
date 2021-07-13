import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import logo from '../images/logo.png';

import './css/login.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [buttonStatus, setButtonStatus] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const validate = () => {
    const { email, password } = loginInfo;
    const PASSWORD_LENGTH = 6;
    const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    if (emailTester.test(email) && password.length >= PASSWORD_LENGTH) {
      return true;
    }
  };

  const ableButton = () => {
    const isValid = validate();
    if (isValid) {
      setButtonStatus(false);
    } else setButtonStatus(true);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setLoginInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
    ableButton();
  };

  const handleLogin = () => {
    const { email } = loginInfo;
    const userFormat = {
      email,
    };
    const mealToken = 1;
    const cockTailsToken = 1;
    localStorage.setItem('user', JSON.stringify(userFormat));
    localStorage.setItem('mealsToken', JSON.stringify(mealToken));
    localStorage.setItem('cocktailsToken', JSON.stringify(cockTailsToken));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <form className="form-login">
      <img className="app-logo" src={ logo } alt="logo do app" />
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ handleChange }
          placeholder="example@email.com"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="mínimo 6 caracteres"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ buttonStatus }
        onClick={ handleLogin }
      >
        Logar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
