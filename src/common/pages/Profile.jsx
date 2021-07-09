import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStorage } from '../../functions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Profile() {
  const [{ email }] = useState(() => getStorage('user'));
  return (
    <div>
      <Header pageName="Perfil" />
      <h1 data-testid="profile-email">{ email }</h1>
      <div className="buttonsInProfile">
        <Link to="/receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
