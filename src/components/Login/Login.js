import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Provider/context';
import './Login.css';

function Login() {
  const {
    user,
    user: { userEmail, password },
    setUser,
  } = useContext(Context);

  const sizePass = 6;
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
    <div className="login">
      <h1>Login</h1>
      <form className="mb-3">
        <label htmlFor="email-input">
          <input
            className="form-control"
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
            className="form-control"
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
            className="btn btn-success"
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
