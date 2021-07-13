import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setToken } from '../services/localStorage';
// import rockGlass from '../images/rockGlass.svg';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');

  const maxLength = 6;
  const isValid = email.match(/((\w+)@(\w+)\.(\w+))/i) && password.length > maxLength;
  return (
    <div className="divLogin">
      <div className="meals">
        <span className="logo">JUST EAT</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          // data={ rockGlass }
        >
          Glass
        </object>
        <label htmlFor="email">
          Email:
          <input
            value={ email }
            type="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            value={ password }
            type="password"
            data-testid="password-input"
            onChange={ (e) => setPassoword(e.target.value) }
          />
        </label>
        <button
          className="loginButton"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ () => {
            setToken(email);
            history.push('/comidas');
          } }
        >
          Login
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
