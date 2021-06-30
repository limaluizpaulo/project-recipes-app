
import React from 'react';
import { Redirect } from 'react-router';

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
    <form>
      <label htmlFor="email">
        <span>E-mail:</span>
        &nbsp;
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ handlechange }
        />
      </label>
      <label htmlFor="password">
        <span>Senha:</span>
        &nbsp;
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ handlechange }
        />
      </label>
      <button
        onClick={ setTokensNEmail }
        disabled={ !(user.email && user.password) }
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
};

export default Login;
