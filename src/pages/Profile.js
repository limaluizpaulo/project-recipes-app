import React from 'react';
import iconProfile from '../images/profileIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const emailLS = JSON.parse(localStorage.user).email;
  return (
    <div>
      <Header title="Perfil" />
      <img src={ iconProfile } alt="profile" />
      <p data-testid="profile-email">{emailLS}</p>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
};

export default Profile;
