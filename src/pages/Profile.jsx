import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneButton from '../components/DoneButton';
import FavoriteButton from '../components/FavoriteButton';
import LogoutButton from '../components/LogoutButton';

// Tela de perfil: /perfil
export default function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h4>Profile</h4>
      <Header history={ history } title="Perfil" />
      <p data-testid="profile-email">{user && user.email}</p>
      <DoneButton history={ history } />
      <FavoriteButton history={ history } />
      <LogoutButton history={ history } />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
