import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const { login } = useContext(RecipesContext);
  const [inputedUser, setInputedUser] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const verifyEmailAndPass = () => {
    const minLength = 5;
    // local que tirei o regex: https://ui.dev/validate-email-address-javascript/
    const regex = /\S+@\S+\.\S+/;
    setButtonDisable(inputedUser.match(regex)
      && password.length > minLength);
  };

  const handle = ({ target: { value } }, callBack) => {
    callBack(value);
    verifyEmailAndPass();
  };

  const buttonLogin = () => {
    login({ inputedUser, password });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailObj = { email: inputedUser };
    localStorage.setItem('user', JSON.stringify(emailObj));
    setRedirect(true);
  };

  return (
    <div>
      { redirect && <Redirect to="/comidas" /> }
      <input
        onChange={ (e) => handle(e, setInputedUser) }
        type="email"
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ (e) => handle(e, setPassword) }
      />
      <button
        type="button"
        onClick={ buttonLogin }
        data-testid="login-submit-btn"
        disabled={ !buttonDisable }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
