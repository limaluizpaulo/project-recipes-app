import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, id } }) => {
    setUser({
      ...user,
      [id]: value,
    });
  };

  return (
    <main>
      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Password
        <input type="text" id="password" data-testid="password-input" />
      </label>
      <button type="submit" data-testid="login-submit-btn">Entrar</button>
      <Button variant="secondary">Entrar</Button>
    </main>
  );
}
