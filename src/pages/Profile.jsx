import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmail, clearStorageAndPushToLogin } from '../services/manageLocalStorage2';

function Profile({ history }) {
  return (
    <>
      <Header title="Perfil" />
      <main>
        <h4
          className="profile-email"
          data-testid="profile-email"
        >
          { getEmail() }
        </h4>
        <section className="buttons-profile">
          <Button
            variant="outline-dark"
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            variant="outline-dark"
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            variant="outline-dark"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => clearStorageAndPushToLogin(history) }
          >
            Sair
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
