import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const emailUser = JSON.parse(localStorage.getItem('user')) || '';

  const deleteUser = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email" className="email-user">{ emailUser.email }</p>
      <div className="links-page">
        <Link to="/receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
            className="btn btn-outline-success"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
            className="btn btn-outline-success"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => deleteUser() }
            className="btn btn-outline-danger"
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
