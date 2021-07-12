import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const loginValidation = () => {
    const emailValidation = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{3,}/i);
    const passwordValidation = 6; // não sei pq não pega com 6
    if (emailValidation.test(email) && password.length > passwordValidation) {
      setIsDisable(false);
    } else setIsDisable(true);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  useEffect(() => {
    loginValidation();
  });

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Digite seu email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Digite sua senha"
          />
        </Form.Group>
        <Button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isDisable }
          onClick={ () => handleClick() }
          variant="primary"
        >
          Entrar
        </Button>
      </Form>
    </Container>

  );
}

export default Login;
