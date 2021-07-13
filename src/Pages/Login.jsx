import React from 'react';
import { Redirect } from 'react-router';
import comida from '../images/comida.jpg';
import logo from '../images/logo_size_invert.jpg';
import drink from '../images/cockitel.png';

const Login = () => {
  const [user, setUser] = React.useState(
    {
      email: '',
      password: '',
    },
  );

  // Essa chave é responsável por redirecionar a página. Default é false
  const [isRedirect, setIsRedirect] = React.useState(false);

  const numberPassword = 6;
  function handlechange({ target: { name, value } }) {
    const format = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);
    if (name === 'email' && format.test(value)) {
      setUser({
        ...user,
        email: value,
      });
    } else if (name === 'password' && value.length > numberPassword) {
      setUser({
        ...user,
        password: value,
      });
    }
  }

  function setTokensNEmail() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    setIsRedirect(true);
  }

  return isRedirect ? <Redirect to="/comidas" /> : (
    <div className="tela-login">
      <div className="background-top">
        <img src={ comida } alt="comida" />
      </div>
      <form className="form-login">
        <img src={ logo } alt="logo" />
        <label htmlFor="email">
        &nbsp;
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ handlechange }
            placeholder="Enter email or username"
          />
        </label>
        <label htmlFor="password">
        &nbsp;
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            onChange={ handlechange }
            placeholder="Senha"
          />
        </label>
        <button
          onClick={ setTokensNEmail }
          disabled={ !(user.email && user.password) }
          type="submit"
          data-testid="login-submit-btn"
        >
          Log In
        </button>
      </form>
      <div className="background-bottom">
        <img src={ drink } alt="drink" />
      </div>
    </div>
  );
};

export default Login;
