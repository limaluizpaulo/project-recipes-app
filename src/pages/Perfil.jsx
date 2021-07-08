import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getItemLocalStorage } from '../services/localStorage';

export default function Perfil() {
  const user = getItemLocalStorage('user');
  const { email } = user || '';
  console.log(localStorage);
  return (
    <section>
      <Header />
      <h1 data-testid="profile-email">{ email }</h1>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); } }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </section>
  );
}
