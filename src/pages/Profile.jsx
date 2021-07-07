import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Profile.css';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header profile name="Perfil" />
      <section className="profile">
        {email && <h5 data-testid="profile-email">{email.email}</h5> }
        <br />
        <Link to="/receitas-feitas">
          <button
            className="btn btn-info"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <br />
        <Link to="/receitas-favoritas">
          <button
            className="btn btn-info"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <br />
        <Link to="/">
          <button
            className="btn btn-danger"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => { localStorage.clear(); } }
          >
            Sair
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
