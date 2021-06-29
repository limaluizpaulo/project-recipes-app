import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useValidation from '../hooks/useValidation';
import { setOnLocalStorage } from '../services/helpers/localStorage';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, checkEmail, checkPassword } = useValidation();
  // Recebe uma callback para alterar o estado dos inputs "setter" outra para validar o input e o valor em questão
  const handleInputChange = (setter, checker, value) => {
    setter(value);
    checker(value);
  };
  // Função que cuida do submit, adiciona tokens no localStorage e redireciona para a rota /comidas
  const handleSubmit = () => {
    setOnLocalStorage('mealsToken', '1');
    setOnLocalStorage('cocktailsToken', '1');
    setOnLocalStorage('user', { email });
    history.push('/comidas');
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => handleInputChange(
            setEmail, checkEmail, value,
          ) }
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => handleInputChange(
            setPassword, checkPassword, value,
          ) }
          type="password"
          name="password"
          placeholder="Senha"
        />
      </div>
      <button
        data-testid="login-submit-btn"
        disabled={ error }
        onClick={ handleSubmit }
        type="button"
      >
        Entrar
      </button>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
