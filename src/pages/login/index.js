import React, { useState } from 'react';

function Login() {
  const [user, setUser] = useState();
  const [disabledButton, setDisabledButton] = useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState, [name]: value,
    }));

    const re = /\S+@\S+\.\S+/;
    const MIN_PASSWORD_LENGTH = 6;
    const email = user.email || '';
    const password = user.senha || '';

    if (re.test(email) && password.length >= MIN_PASSWORD_LENGTH) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }

  return (
    <div>
      <label className="email" htmlFor="email-input">
        <span>
          Email
        </span>
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
        <span>
          Senha
        </span>
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
        disabled={ disabledButton }
        onClick={ () => console.log('cliquei') }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
