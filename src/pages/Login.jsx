import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeLocalStorage } from '../services/localStorage';

function Login() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const validateFields = ({ email, password }) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordLength = password.length;
    const minPassword = 6;

    if ((regex.test(email)) && (passwordLength > minPassword)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { email } = login;
    initializeLocalStorage(email);
  };

  useEffect(() => {
    validateFields(login);
  }, [login]);

  return (
    <div>
      <div>
        <h5>Email</h5>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
        <h5>Senha</h5>
        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      <Link to="/comidas">
        <button
          className="loginButton"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disableBtn }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
