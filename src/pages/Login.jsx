import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import './Login.css';
import RecipesContext from '../context/RecipesContext';

// Ref: https://react-bootstrap.netlify.app/components/forms/#forms
// Ref: https://github.com/tryber/sd-010-trybooks/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassowd] = useState('');
  const { successLogin } = useContext(RecipesContext);

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    successLogin(email, password);
    history.push('/comidas');
  }

  function renderBtn() {
    const SIX = 6;
    if (email.length > 0 && password.length >= SIX) {
      return (
        <Button
          variant="primary"
          data-testid="login-submit-btn"
          type="submit"
        >
          Login
        </Button>
      );
    }
    return (
      <Button
        variant="primary"
        data-testid="login-submit-btn"
        type="submit"
        disabled
      >
        Login
      </Button>
    );
  }

  return (
    <main className="login-page">
      <h1>App de Receitas</h1>
      <Form onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="Enter email"
            data-testid="email-input"
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          pattern="[0-9a-zA-Z]{6,}"
        >
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={ password }
            onChange={ (e) => setPassowd(e.target.value) }
            placeholder="Password"
            data-testid="password-input"
            required
          />
        </Form.Group>
        { renderBtn() }
      </Form>
    </main>
  );
}
