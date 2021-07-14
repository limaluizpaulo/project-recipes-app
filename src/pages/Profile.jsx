import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi';
import { Footer, Header } from '../components';
import profileImage from './css/images/profile-image.jpg';
import './css/profile.css';

function Profile() {
  let userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) {
    userData = '';
  }
  const [email] = useState(userData.email);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <main id="profile-main">
      <Header />
      <div id="profileImgContainer">
        <img id="profileImg" src={ profileImage } alt="profile frame" />
      </div>
      <p
        data-testid="profile-email"
        id="profile-email"
      >
        {email}
        <span id="emailPencil"><HiOutlinePencil /></span>
      </p>
      <section>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          <Link to="/receitas-feitas">
            Receitas Feitas
          </Link>
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          <Link to="/receitas-favoritas">
            Receitas Favoritas
          </Link>
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          <Link to="/">
            Sair
          </Link>
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;
