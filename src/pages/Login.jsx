import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [buttonStatus, setButtonStatus] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const validate = () => {
    const { email, password } = loginInfo;
    const PASSWORD_LENGTH = 5;
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
    localStorage.setItem('user', JSON.stringify(email));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          data-testid="password-input"
          type="password"
          name="password"
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
