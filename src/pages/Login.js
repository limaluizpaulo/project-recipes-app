import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user.context';

function Login() {
  const { setUserEmail } = useContext(UserContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  function handleChange({ target }) {
    const { name, value } = target;
    setInput((prevState) => ({
      ...prevState, [name]: value,
    }));
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
    <div>
      <label className="email" htmlFor="email-input">
        Email
        <input
          type="email"
          id="email-input"
          name="email"
          placeholder="Digite seu email"
          onChange={ handleChange }
          data-testid="email-input"
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
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        onClick={ () => { setUserEmail(input.email); history.push('/comidas'); } }
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
