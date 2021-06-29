import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';

function Login() {
  const [passwordInvalid, setPasswordInvalid] = useState(true);
  const [emailInvalid, setEmailInvalid] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleEmail = (event) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(event.target.value)) {
      setEmailInvalid(false);
      setUserEmail(event.target.value);
    }
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    const LENGTH_PASSWORD = 6;
    if (password.length > LENGTH_PASSWORD) {
      setPasswordInvalid(false);
    }
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
            onChange={ handleEmail }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ handlePassword }
          />
        </Form.Group>
        <Button
          data-testid="login-submit-btn"
          variant="primary"
          type="submit"
          disabled={ emailInvalid || passwordInvalid }
          onClick={ handleClick }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Login;
