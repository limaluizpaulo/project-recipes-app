import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { initializeLocalStorage } from '../services/localStorage';
import logo from '../images/logo.png';

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
      <img src={ logo } alt="logo" />
      <div>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ handleChange }
            placeholder="Email"
          />
        </label>
        <label htmlFor="password-input">
          <input
            placeholder="Senha"
            id="password-input"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      <Link to="/comidas">
        <Button
          variant="warning"
          size="lg"
          className="loginButton"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disableBtn }
          onClick={ handleClick }
        >
          Entrar/Logar
        </Button>
      </Link>
    </div>
  );
}

export default Login;
