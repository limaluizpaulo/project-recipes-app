import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getItemLocalStorage } from '../services/localStorage';

export default function Perfil() {
  const user = getItemLocalStorage('user');
  const { email } = user || '';
  return (
    <section>
      <Header />
      <h3 data-testid="profile-email">{ email }</h3>
      <Link to="/receitas-feitas">
        <Button
          variant="outline-danger"
          size="sm"
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          variant="outline-danger"
          size="sm"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          variant="outline-danger"
          size="sm"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); } }
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </section>
  );
}
