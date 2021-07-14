import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import { saveUserEmail } from '../storage/localStorage';
import Logo from '../images/logo.svg';
import '../styles/login.css';

const REGEX_EMAIL = /\S+@\S+\.\S+/;

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState(false);
  const history = useHistory();
  const { setInfo, userInfo } = useContext(RecipesContext);

  useEffect(() => {
    const passMin = 6;
    const { email, password } = user;
    setValidation((email.match(REGEX_EMAIL) && password.length > passMin));
  }, [user]);

  function handleInputChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }

  function handleLoginClick(e) {
    e.preventDefault();
    const { email } = user;
    saveUserEmail({ email });
    setInfo({ ...userInfo, email });
    history.push('/comidas');
  }

  return (
    <section className="container-login">
      <img src={ Logo } alt="logo" />
      <Form className="login__form">
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="inputs"
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ handleInputChange }
          />
          <Form.Text className="text-muted">
            {' We\'ll never share your email with anyone else.'}
          </Form.Text>
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="inputs"
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ handleInputChange }
            placeholder="6 or more characters"
          />
        </Form.Group>

        <Button
          className="button-submit"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validation }
          onClick={ (e) => handleLoginClick(e) }
        >
          Submit
        </Button>
      </Form>
    </section>
  );
}
