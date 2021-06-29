import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Provider/context';

function Login() {
  const sizePass = 6;
  const { user,
    user: { email, password },
    setUser } = useContext(Context);
  // const { login } = this.props;
  const passwordCheck = password.length > sizePass;
  const emailCheck = RegExp(/^[\w+.]+@\w+\.\w{2,}?$/).test(email);

  function handleChange({ target: { value, name } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            value={ email }
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
            onClick={ localStorage.setItem('mealsToken', JSON.stringify({})) }
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
