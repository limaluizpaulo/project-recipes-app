import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de perfil: /perfil
export default function Profile({ history }) {
  return (
    <div>
      <h4>Profile</h4>
      <Header history={ history } title="Perfil" />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
