import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
import logo from '../images/mustachef.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const minPasswordLength = 6;
  const history = useHistory();

  const login = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  };

  const validateFields = () => {
    if (validEmail && validPassword) {
      return setDisable(false);
    }
    return setDisable(true);
  };

  const validateEmail = (value) => {
    setEmail(value);
    const regex = /\S+@\S+\.\S+/;
    setValidEmail(regex.test(value));
  };

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length > minPasswordLength) {
      setValidPassword(true);
    }
  };

  useEffect(() => {
    validateFields();
  });

  return (
    <section>
      <img src={ logo } alt="logo" />
      <form>
        <Input
          type="email"
          label="Email:"
          func={ validateEmail }
          testid="email-input"
          value={ email }
        />
        <Input
          type="password"
          label="Password:"
          func={ validatePassword }
          testid="password-input"
          value={ password }
        />
        <Button
          disabled={ disable }
          func={ login }
          label="Login"
          testid="login-submit-btn"
        />
      </form>
    </section>
  );
}
