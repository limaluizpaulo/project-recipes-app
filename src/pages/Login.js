import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import LoginContext from '../context/LoginContext';
import logo from '../images/logo.svg';
import '../styles/Login.css';

// Ref: https://react-bootstrap.netlify.app/components/forms/#forms
// Ref: https://github.com/tryber/sd-010-trybooks/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassowd] = useState('');
  const { successLogin } = useContext(LoginContext);

  const history = useHistory();

  function loginValidation() {
    // fonte: https://www.w3resource.com/javascript/form/email-validation.php

    const mail = /\S+@\S+\.\S+/;

    const passwordMinLenght = 6;
    if (email.match(mail) && password.length > passwordMinLenght) {
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    successLogin(email, password);
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  }

  return (
    <main className="login-page">
      <img src={ logo } alt="logo" />
      <h1>App de Receitas</h1>
      <Form onSubmit={ handleSubmit }>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
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
        <Button
          variant="primary"
          data-testid="login-submit-btn"
          type="submit"
          disabled={ loginValidation() }
        >
          Login
        </Button>
      </Form>
    </main>
  );
}
