import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar: /explorar;
export default function Explore({ history }) {
  return (
    <div>
      <h4>Explore</h4>
      <Header history={ history } title="Explorar" />
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};
