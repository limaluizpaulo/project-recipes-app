import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rockGlass from '../images/rockGlass.svg';
// import ContextRecipes from '../context/contextRecipes';

function Login({ history }) {
  // const { setTitle } = useContext(ContextRecipes);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/[a-z]+@[a-z]+.com/g);
      const minLength = 6;
      const validPassword = password.length > minLength;
      if (validEmail) {
        if (validPassword) {
          setIsDisable(false);
        }
      } else {
        setIsDisable(true);
      }
    };
    isValid();
  }, [email, password, isDisable]);

  const isRedirect = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
    // setTitle('Comidas');
  };

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form>
        <input
          type="email"
          name="email-input"
          placeholder="Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ isRedirect }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Login;
