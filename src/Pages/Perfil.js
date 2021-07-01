import React, { Component } from 'react';

class Perfil extends Component {
  constructor() {
    super();
    this.pegaEmail = this.pegaEmail.bind(this);
  }

  pegaEmail() {
    const stringUser = localStorage.getItem('user');
    const objUser = JSON.parse(stringUser);
    const { email } = objUser;
    if (email === null) {
      return null;
    }
    return email;
  }

  render() {
    return (
      <div>
        <div>
          <span
            data-testid="profile-email"
          >
            { this.pegaEmail() }
          </span>
        </div>
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
        >
          Sair
        </button>
      </div>
    );
  }
}
export default Perfil;
