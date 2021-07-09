import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const inputsCheck = () => {
    const six = 6;
    const emailCheck = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{3,}/i);
    if (emailCheck.test(email) && password.length > six) setIsDisable(false);
    else setIsDisable(true);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
<<<<<<< HEAD
=======
    // localStorage.setItem('favoriteRecipes', []);
>>>>>>> 04f30f4ace55c317dfe7256fc952a042fa2126b3
    history.push('/comidas');
    // https://dev.to/ino_gu/utilizando-usehistory-no-react-bgf
  };

  useEffect(() => {
    inputsCheck();
  });

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Digite seu email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Digite sua senha"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisable }
        onClick={ () => handleClick() }
      >
        Entrar
      </button>
    </div>
  );
}
