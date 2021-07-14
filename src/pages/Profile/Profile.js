import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Profile() {
  const userInfos = JSON.parse(localStorage.user);
  return (
    <div id="page-drinks">
      <div>
        <Header title="Perfil" />
        <span data-testid="profile-email">{userInfos.email}</span>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
