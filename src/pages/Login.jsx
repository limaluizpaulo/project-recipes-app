import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const validateFields = ({ email, password }) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordLenght = password.length;
    const minPassword = 6;

    if ((regex.test(email)) && (passwordLenght > minPassword)) {
      console.log('entrei');
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

  useEffect(() => {
    validateFields(login);
  }, [login]);

  return (
    <>
      <label htmlFor="email-input">
        <input
          id="email-input"
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password-input">
        <input
          id="password-input"
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disableBtn }
        >
          Entrar
        </button>
      </Link>
    </>
  );
}

export default Login;
