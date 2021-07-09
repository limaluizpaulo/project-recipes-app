import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user.context';

function Login() {
  const { setUserEmail } = useContext(UserContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  function handleChange({ target: { name, value } }) {
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleClick() {
    setUserEmail(input.email);
    localStorage.setItem('user', JSON.stringify({ email: input.email }));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    history.push('/comidas');
  }

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const MIN_PASSWORD_LENGTH = 7;
    const { email, password } = input;

    if (re.test(email) && password.length >= MIN_PASSWORD_LENGTH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input]);

  return (
    <main>
      <label className="email" htmlFor="email-input">
        Email
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Digite seu email"
          onChange={ handleChange }
        />
      </label>
      <label className="senha" htmlFor="password-input">
        Senha
        <input
          type="password"
          id="password-input"
          name="password"
          placeholder="Digite seu senha"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Login
      </button>
    </main>
  );
}

export default Login;
