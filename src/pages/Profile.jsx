import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <main>
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        <Link to="/receitas-feitas">
          Receitas Feitas
        </Link>
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        <Link to="/receitas-favoritas">
          Receitas Favoritas
        </Link>
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearLocalStorage }
      >
        <Link to="/">
          Sair
        </Link>
      </button>
    </main>
  );
}

export default Profile;
