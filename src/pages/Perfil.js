import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Page.css';
import '../css/Buttons.css';

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
      <div className="page">
        <div className="perfil-container">
          <section>
            <Header title="Perfil" searchIcon />
          </section>

          <div className="buttons-recipes-container">
            <p data-testid="profile-email" className="email-user">
              {this.mailUser()}
            </p>

            <Link
              to="/receitas-feitas"
              type="button"
              data-testid="profile-done-btn"
            >
              <button type="button" className="button-recipes-done">
                Receitas Feitas
              </button>
            </Link>

            <Link
              to="/receitas-favoritas"
              type="button"
              data-testid="profile-favorite-btn"
            >
              <button type="button" className="button-recipes-done">
                Receitas Favoritas
              </button>
            </Link>

            <Link
              to="/"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ this.clearStorage }
            >
              <button type="button" className="button-recipes-done">
                Sair
              </button>
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Perfil;
