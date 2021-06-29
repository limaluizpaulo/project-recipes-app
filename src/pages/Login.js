import React from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            data-testid="email-input"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
          />
        </Form.Group>
        <Button variant="primary" type="submit" data-testid="login-submit-btn">
          Entrar
        </Button>
      </Form>
    );
  }
}

export default Login;
