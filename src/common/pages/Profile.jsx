import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

import { getStorage } from '../../functions';
// import profileImg from '../../images/profile.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Profile() {
  const [{ email }] = useState(() => getStorage('user', { email: '' }));

  const renderBtnsProfile = () => (
    <div className="buttonsInProfile">
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
          className="buttonsRecipes"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="buttonsRecipes"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          className="buttonExit"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </div>
  );

  return (
    <main>
      <Header pageName="Perfil" />
      <div className="container">
        <div className="card">
          <div className="mainContentProfile">
            <h3 className="userName">{ `@${email.split('@')[0]}` }</h3>
            <h3 data-testid="profile-email" className="email">{ email }</h3>
          </div>
          <div className="loginSocial">
            <FaFacebookF className="loginSocial-icon" />
            <FaTwitter className="loginSocial-icon" />
            <FaGoogle className="loginSocial-icon" />
          </div>
          {renderBtnsProfile()}
        </div>
      </div>
      <Footer />
    </main>
  );
}
