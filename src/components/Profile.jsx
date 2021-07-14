import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : 'a@a.com';
  return (
    <div className="profile">
      <h4 className="headingProfile" data-testid="profile-email">{ email }</h4>
      <Link to="/receitas-feitas">
        <Button
          variant="outline-danger"
          size="lg"
          className="buttonsProfile"
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas

        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          variant="outline-danger"
          size="lg"
          className="buttonsProfile"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          variant="outline-danger"
          size="lg"
          className="buttonsProfile"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair

        </Button>
      </Link>
    </div>
  );
}
