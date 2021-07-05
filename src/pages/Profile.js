import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));

  // https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/clear
  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header />
      <p data-testid="profile-email">
        { Object.values(email) }
      </p>
      <Link to="/receitas-feitas">
        <Button
          data-testid="profile-done-btn"
          type="button"
        >
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClick }
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </>
  );
}
