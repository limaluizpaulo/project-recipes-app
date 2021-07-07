import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Perfil extends Component {
  constructor() {
    super();
    this.mailUser = this.mailUser.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  mailUser() {
    // codigo para localStorage conseguido https://josiaspereira.com.br/como-usar-localstorage-no-reactjs/
    const emailStorage = localStorage.getItem('user');
    const objEmail = JSON.parse(emailStorage);
    if (objEmail) {
      const { email } = objEmail;
      if (email !== null) {
        return email;
      }
      return null;
    }
  }

  clearStorage() {
    localStorage.clear();
  }

  render() {
    return (
      <>
        <section>
          <Header title="Perfil" searchIcon />
        </section>
        <section>
          <p data-testid="profile-email">
            {this.mailUser()}
          </p>
          <Link
            to="/receitas-feitas"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Link>
          <Link
            to="/receitas-favoritas"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Link>
          <Link
            to="/"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.clearStorage }
          >
            Sair
          </Link>
        </section>
        <Footer />
      </>
    );
  }
}

export default Perfil;
