import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { getSearchBarResponse } from '../action';

export class TelaDePerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.updateState = this.updateState.bind(this);
    this.buttonsRender = this.buttonsRender.bind(this);
  }

  componentDidMount() {
    const { hasSearchBar } = this.props;
    hasSearchBar(false);
    const info = JSON.parse(localStorage.getItem('user'));
    console.log(info);
    if (info !== null) { return this.updateState(info.email); }
    this.updateState('email@email.com');
  }

  updateState(email) {
    this.setState({ email });
  }

  buttonsRender() {
    return (
      <>
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
            onClick={ this.cleanLocalStorage }
          >
            Sair
          </button>
        </Link>

      </>
    );
  }

  cleanLocalStorage() {
    localStorage.clear();
  }

  render() {
    const { location } = this.props;
    const { email } = this.state;

    return (
      <div>
        <Header location={ location } />

        <h1 data-testid="profile-email">{email}</h1>
        {this.buttonsRender()}
        <Footer />
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaDePerfil.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaDePerfil);
