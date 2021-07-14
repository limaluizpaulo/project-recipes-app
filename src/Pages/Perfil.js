import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Perfil extends Component {
  constructor() {
    super();
    this.pegaEmail = this.pegaEmail.bind(this);
  }

  pegaEmail() {
    const stringUser = localStorage.getItem('user');
    const objUser = JSON.parse(stringUser);
    if (objUser) {
      const { email } = objUser;
      if (email === null) {
        return null;
      }
      return email;
    }
    return null;
  }

  render() {
    return (
      <div>
        <div>
          <span data-testid="page-title">
            Perfil
          </span>
          <span
            data-testid="profile-email"
          >
            { this.pegaEmail() }
          </span>
        </div>
        <div>
          <Link
            data-testid="profile-done-btn"
            to="receitas-feitas"
          >
            Receitas Feitas
          </Link>
          <Link
            data-testid="profile-favorite-btn"
            to="receitas-favoritas"
          >
            Receitas Favoritas
          </Link>
          <Link
            to="/"
          >
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>

          </Link>
        </div>

      </div>
    );
  }
}
export default Perfil;
