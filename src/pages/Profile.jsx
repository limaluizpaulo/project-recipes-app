import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';

function Profile() {
  let userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) {
    userData = '';
  }
  const [email] = useState(userData.email);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <main>
      <Header />
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
      <Footer />
    </main>
  );
}

export default Profile;
