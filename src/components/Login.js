import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Provider/context';

function Login() {
  const sizePass = 6;
  const { user,
    user: { userEmail, password },
    setUser } = useContext(Context);
  const passwordCheck = password.length > sizePass;
  const emailCheck = RegExp(/^[\w+.]+@\w+\.\w{2,}?$/).test(userEmail);

  function handleChange({ target: { value, name } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="userEmail"
            placeholder="Email"
            value={ userEmail }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            value={ password }
            type="password"
            onChange={ handleChange }
          />
        </label>
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            disabled={ !passwordCheck || !emailCheck }
            onClick={ saveToLocalStorage }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
