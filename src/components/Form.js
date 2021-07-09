import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Context } from '../context/ContextForm';
import '../styles/global.css';

function Form() {
  const history = useHistory();
  const { email, setEmail, pass, setPass } = useContext(Context);

  function submit(ev) {
    ev.preventDefault();

    if (localStorage.getItem('favoriteRecipes') === null) {
      const Favorite = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(Favorite));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        meals: {
        },
        cocktails: {
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/comidas');
  }

  const nameLength = 6;
  return (
    <form className="login" onSubmit={ submit }>
      <label htmlFor="email">
        <h5>Email</h5>
        <input
          value={ email }
          placeholder="Digite seu email"
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          id="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <h5>Senha</h5>
        <input
          value={ pass }
          placeholder="Digite sua senha"
          onChange={ ({ target }) => setPass(target.value) }
          type="password"
          id="password"
          data-testid="password-input"
        />
      </label>
      <Button
        type="submit"
        variant="success"
        data-testid="login-submit-btn"
        disabled={
          !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
          || pass.length <= nameLength
        }
      >
        Entrar
      </Button>
    </form>
  );
}

export default Form;
