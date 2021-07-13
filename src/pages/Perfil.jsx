import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import '../Style/Perfil.css';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.getEmail = this.getEmail.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getEmail();
  }

  getEmail() {
    const { email } = this.props;
    console.log(email);
    this.setState({
      email,
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  render() {
    const { email = 'teste@teste.com' } = this.state;
    return (
      <div>
        <Header header="Perfil" />
        <div className="page-perfil">
          <h5>Você está logado como: </h5>
          <p data-testid="profile-email">{email}</p>
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ this.clearLocalStorage }
            >
              Sair
            </button>
          </Link>
        </div>
        <DownMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Perfil.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Perfil);
