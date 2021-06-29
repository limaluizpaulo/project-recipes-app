import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const validLoginEmail = () => {
    const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const { email } = user;
    return regex.test(email);
  };

  const validLoginPassword = () => {
    const { password } = user;
    console.log(password);
    const minCharacters = 6;
    if (password.length >= minCharacters) {
      return true;
    }
  };

  const handleChange = ({ target: { value, id } }) => {
    setUser({
      ...user,
      [id]: value,
    });
    console.log(user);
  };

  const disabledButton = validLoginEmail() && validLoginPassword();

  return (

    <Form>
      <Form.Group>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control
          type="email"
          id="email"
          data-testid="email-input"
          onChange={ (event) => handleChange(event) }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          id="password"
          data-testid="password-input"
          onChange={ (event) => handleChange(event) }
        />
      </Form.Group>

      <Button
        disabled={ !disabledButton }
        variant="secondary"
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </Button>

    </Form>
  );
}
