import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { history } = this.props;
    const { email, senha } = this.state;
    const checkEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const min = 6;
    const verificaBotao = email.match(checkEmail) && senha.length > min ? null : true;
    const checkLogin = () => {
      localStorage.mealsToken = 1;
      localStorage.cocktailsToken = 1;
      localStorage.user = JSON.stringify({
        email,
      });
      history.push('/comidas');
    };

    return (
      <div className="login">
        <label htmlFor="email">
          <input
            type="email"
            className="title1"
            placeholder="E-mail"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="senha">
          <input
            type="password"
            className="title"
            placeholder="Senha"
            data-testid="password-input"
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="login-submit-btn"
          className="btnLogin"
          disabled={ verificaBotao }
          onClick={ checkLogin }
        >
          {' '}
          ENTRAR
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
