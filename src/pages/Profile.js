import React, { useState } from 'react';
import { Redirect } from 'react-router';

import './style/Profile.css';

function Perfil() {
  const email = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email : null;

  const [goDoneRecipes, setGoDoneRecipes] = useState(false);
  const [goFavoriteRecipes, setGoFavoriteRecipes] = useState(false);
  const [logoff, setLogoff] = useState(false);

  const clearLocalStorage = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    setLogoff(true);
  };

  return (
    <div className="Perfil">
      { goDoneRecipes && <Redirect to="/receitas-feitas" /> }
      { goFavoriteRecipes && <Redirect to="/receitas-favoritas" /> }
      { logoff && <Redirect to="/" /> }

      <h1 data-testid="profile-email">
        { email }
      </h1>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => setGoDoneRecipes(true) }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => setGoFavoriteRecipes(true) }
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearLocalStorage }
      >
        Sair
      </button>
    </div>
  );
}
export default Perfil;
