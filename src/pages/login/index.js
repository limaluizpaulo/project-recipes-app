import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [disabledButton, setDisabledButton] = useState(true);
  const history = useHistory();

  function handleChange({ target }) {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState, [name]: value,
    }));
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', {
      email: user.email
    });  

    history.push('/comidas');
  }

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const MIN_PASSWORD_LENGTH = 7;
    const email = user.email || '';
    const password = user.password || '';

    if (re.test(email) && password.length >= MIN_PASSWORD_LENGTH) {
      console.log(password);
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div>
      <label className="email" htmlFor="email-input">
        <span>Email</span>
        <input
          onChange={ handleChange }
          data-testid="email-input"
          id="email-input"
          type="email"
          name="email"
          value={ user.email || '' }
          placeholder="Digite seu email"
        />
      </label>
      <label className="senha" htmlFor="password-input">
        <span>Senha</span>
        <input
          onChange={ handleChange }
          data-testid="password-input"
          id="password-input"
          type="password"
          name="password"
          value={ user.password || '' }
          placeholder="Digite seu senha"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabledButton }
        onClick={ () => handleClick() }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
