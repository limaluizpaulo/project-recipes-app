import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/user.context';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);
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
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/comidas');
  }

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (!doneRecipes) localStorage.setItem('doneRecipes', JSON.stringify([]));

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) localStorage.setItem('favoriteRecipes', JSON.stringify([]));

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    const initialObj = {
      meals: {
        52771: [],
      },
    };
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialObj));
    }
  }, []);

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const MIN_PASSWORD_LENGTH = 7;
    const { email } = user;
    const { password } = user;

    if (re.test(email) && password.length >= MIN_PASSWORD_LENGTH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

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
        onClick={ () => handleClick() }
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
