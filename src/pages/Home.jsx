import React, { useState, useEffect } from 'react';

function Home() {
  const [checkLogin, setCheckLogin] = useState({
    email: '',
    password: '',
    checkEmail: false,
    checkPassword: false,
  });

  const emailValidation = () => {
    const { email } = checkLogin;
    const checkEmail = (/[\w.]+@\w+\.\w{2,4}/).test(email);
    setCheckLogin({ ...checkLogin, checkEmail });
  };

  const passwordValidation = () => {
    const { password } = checkLogin;
    const FIVE = 5;

    setCheckLogin({ ...checkLogin, checkPassword: password.length > FIVE });
  };

  useEffect(() => {
    passwordValidation();
  }, [checkLogin.password]);

  useEffect(() => {
    emailValidation();
  }, [checkLogin.email]);

  const handleChange = ({ target: { name, value } }) => {
    setCheckLogin({ ...checkLogin, [name]: value });
  };
  const { checkPassword, checkEmail } = checkLogin;
  return (
    <main>
      <label htmlFor="input-Email">
        <input
          types="text"
          placeholder="Email"
          id="input-Email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="input-Password">
        <input
          type="password"
          placeholder="Password"
          id="input-Password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(checkPassword && checkEmail) }
      >
        Entrar
      </button>
    </main>
  );
}

export default Home;
