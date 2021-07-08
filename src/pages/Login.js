import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getRecipes } from '../helpers';
import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import UserContext from '../context/user.context';

function Login() {
  const { setDrinks } = useContext(DrinksContext);
  const { setMeals } = useContext(MealsContext);
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
    getRecipes({ type: 'drinks', setFn: setDrinks });
    getRecipes({ type: 'meals', setFn: setMeals });

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
        onClick={ handleClick }
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Login
      </button>
    </main>
  );
}

export default Login;
