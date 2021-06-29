import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Context } from '../context/ContextForm';

function Form() {
  const history = useHistory();
  const { email, setEmail, pass, setPass } = useContext(Context);

  function submit(ev) {
    ev.preventDefault();

    history.push('/comidas');
  }

  const nameLength = 6;
  return (
    <form onSubmit={ submit }>
      <label htmlFor="email">
        <input
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          id="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <input
          value={ pass }
          onChange={ ({ target }) => setPass(target.value) }
          type="password"
          id="password"
          data-testid="password-input"
        />
      </label>
      <Button
        type="submit"
        variant="success"
        data-testid="login-submit-btn"
        disabled={
          !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
          || pass.length <= nameLength
        }
      >
        Entrar
      </Button>
    </form>
  );
}

export default Form;
