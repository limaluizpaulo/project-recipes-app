import React from 'react';
import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      botaoDesabilitado: true,
      redirecionaParaRotaComidas: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, id } }) {
    this.setState({
      [id]: value,
    },
    () => {
      const { email, password } = this.state;
      const quantidadeMinimaCaracteresSenha = 7;
      const senhaValida = password.length >= quantidadeMinimaCaracteresSenha;
      if (this.validateEmail(email) && senhaValida) {
        this.setState({
          botaoDesabilitado: false,
        });
      }
    });
  }

  setStorage() {
    const { email } = this.state;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    this.setState({
      redirecionaParaRotaComidas: true,
    });
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { botaoDesabilitado, redirecionaParaRotaComidas } = this.state;

    if (redirecionaParaRotaComidas) {
      return (
        <Redirect to="/comidas" />
      );
    }

    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            onChange={ (e) => this.handleChange(e) }
            id="email"
            data-testid="email-input"
          />
          E-mail
        </label>
        <label htmlFor="password">
          <input
            type="password"
            onChange={ this.handleChange }
            id="password"
            data-testid="password-input"
          />
          Senha
        </label>
        <button
          disabled={ botaoDesabilitado }
          type="submit"
          onClick={ () => this.setStorage() }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
