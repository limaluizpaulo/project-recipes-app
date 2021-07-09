import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user.context';
import './Login.css';

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
    <main className="login-page">
      <h1>Recipe App</h1>
      <section className="login-container">
        <label htmlFor="email-input">
          <span>Email</span>
          <input
            type="email"
            id="email-input"
            className="text-input"
            name="email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password-input">
          <span>Password</span>
          <input
            type="password"
            id="password-input"
            className="text-input"
            name="password"
            onChange={ handleChange }
          />
        </label>
        <div>
          <button
            type="button"
            className="alt-button"
            onClick={ handleClick }
            disabled={ isDisabled }
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;
