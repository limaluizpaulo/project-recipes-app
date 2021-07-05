import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Perfil extends Component {
  constructor() {
    super();
    this.mailUser = this.mailUser.bind(this);
  }

  mailUser() {
    // codigo para localStorage conseguido https://josiaspereira.com.br/como-usar-localstorage-no-reactjs/
    const emailStorage = localStorage.getItem('user');
    const objEmail = JSON.parse(emailStorage);
    const { email } = objEmail;
    if (email !== null) {
      return email;
    }
    return null;
  }

  render() {
    return (
      <>
        <section>
          <Header title="Perfil" searchIcon />
        </section>
        <section>
          <p data-testid="profile-email">
            {this.mailUser}
          </p>
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
        </section>
        <Footer />
      </>
    );
  }
}

export default Perfil;
