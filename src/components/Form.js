import React from 'react';
import { Button } from 'react-bootstrap';

function Form() {
  return (
    <form>
      <label htmlFor="email">
        <input type="email" id="email" data-testid="email-input" />
      </label>
      <label htmlFor="password">
        <input type="password" id="password" data-testid="password-input" />
      </label>
      <Button type="submit" variant="success" data-testid="login-submit-btn">
        Entrar
      </Button>
    </form>
  );
}

export default Form;
