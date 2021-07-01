import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import store, { addLogin } from '../../context/store';
import { setStorage } from '../../functions';

export default function Login() {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { user, setUser } = useContext(store);
  const { email, password } = user;

  const validationEmailPwd = () => {
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const Email = regex.test(email);
    const Pwd = password.length;
    const minPwd = 7;

    if (Email && Pwd >= minPwd) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleClick = () => {
    setStorage('user', { email });
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    setDisabledBtn(true);
  };

  // CICLOS DE VIDA --------------------------------------------------------------------------

  useEffect(validationEmailPwd, [email, password.length, user]);

  // ------------------------------------------------------------------------------------------
  return (
    <div>
      <input
        name="email"
        placeholder="Insira seu e-mail"
        data-testid="email-input"
        onChange={ (e) => setUser(addLogin(e)) }
      />
      <input
        type="password"
        name="password"
        placeholder="Insira sua senha de 7 dígitos"
        data-testid="password-input"
        onChange={ (e) => setUser(addLogin(e)) }
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabledBtn }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
