import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const { setUser } = useContext(RecipesContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToComidas, setRedirectToComidas] = useState(false);
  const [buttonAbled, setButtonAbled] = useState(false);

  useEffect(() => {
    const minPasswordLength = 7;
    const regex = /\S+@\S+\.\S+/;
    setButtonAbled(email.match(regex)
        && password.length >= minPasswordLength);
  }, [email, password]);

  const handleChange = ({ target: { value } }, callBack) => {
    callBack(value);
  };

  const setLocalStorage = () => {
    const emailObj = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailObj));
  };

  const buttonLogin = () => {
    setUser(email);
    setLocalStorage();
    setRedirectToComidas(true);
  };

  return (
    <div>
      { redirectToComidas && <Redirect to="/comidas" /> }
      <input
        onChange={ (event) => handleChange(event, setEmail) }
        type="email"
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ (event) => handleChange(event, setPassword) }
      />
      <button
        type="button"
        onClick={ buttonLogin }
        data-testid="login-submit-btn"
        disabled={ !buttonAbled }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
