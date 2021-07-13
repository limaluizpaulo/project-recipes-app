import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/HeadBar';

const clickLogout = () => {
  localStorage.clear();
};

const Profile = () => {
  const email = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email
    : '';
  return (
    <div className="tela-profile">
      <Header title="Perfil" />
      <div className="menu-profile">
        <h3 data-testid="profile-email">{email}</h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="btn-menu"
          >
            Receitas Feitas

          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="btn-menu"
          >
            Receitas Favoritas

          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            className="btn-menu"
            data-testid="profile-logout-btn"
            onClick={ () => clickLogout() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
