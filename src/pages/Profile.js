import React from 'react';
import { Link } from 'react-router-dom';
// import iconProfile from '../images/profileIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const emailLS = localStorage.user ? JSON.parse(localStorage.user).email : '';
  return (
    <div>
      <Header title="Perfil" />
      {/* <img src={ iconProfile } alt="profile" /> */}
      <p data-testid="profile-email">{emailLS}</p>
      <nav>
        <Link to="/receitas-feitas">
          <button
            className="buttons-cattegory"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="buttons-cattegory"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className="buttons-cattegory"
            onClick={ () => localStorage.clear() }
            type="button"
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
      </nav>
      <Footer />
    </div>
  );
};

export default Profile;
