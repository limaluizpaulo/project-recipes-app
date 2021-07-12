import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor() {
    super();
    this.onClickLogOut = this.onClickLogOut.bind(this);
  }

  onClickLogOut() {
    const { history } = this.props;
    localStorage.removeItem('email');
    history.push('/');
  }

  render() {
    return (
      <section>
        <Header title="Perfil" />
        <p data-testid="profile-email">{JSON.parse(localStorage.getItem('email'))}</p>
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn" type="button">
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn" type="button">
            Receitas Favoritas
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ this.onClickLogOut }
        >
          Sair
        </button>
        <Footer />
      </section>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
