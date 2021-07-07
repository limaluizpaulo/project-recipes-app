import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Footer } from '../components';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const Profile = () => {
  const { email } = getFromLocalStorage('user') || '';

  return (
    <main>
      <Header name="Perfil" />

      <h2 data-testid="profile-email">{ email }</h2>

      <Link
        data-testid="profile-done-btn"
        to="/receitas-feitas"
      >
        Receitas Feitas
      </Link>

      <Link
        data-testid="profile-favorite-btn"
        to="/receitas-favoritas"
      >
        Receitas Favoritas
      </Link>

      <Link
        data-testid="profile-logout-btn"
        to="/"
        onClick={ () => { localStorage.clear(); } }
      >
        Sair
      </Link>

      <Footer />
    </main>
  );
};

export default Profile;
