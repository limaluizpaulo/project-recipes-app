import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../action';

class login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      errors: {},
      btnDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validade = this.validade.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
    this.validade(this.state);
  }

  handleClick() {
    const { userEmailDispatch, history } = this.props;
    const { userEmail } = this.state;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));

    this.setState({ userEmail: '', userPassword: '' });
    history.push('/comidas');

    userEmailDispatch(userEmail);
  }

  validade(state) {
    const errors = {};
    const lengthPassword = 6;

    if (!/(\w+[0-9]*)+@\w+\.\w+/.test(state.userEmail)) {
      errors.errorEmail = 'Por favor, insira um email válido';
      return this.setState({ btnDisable: true, errors });
    }

    if (state.userPassword.length < lengthPassword) {
      errors.errorPassword = 'Por favor, insira uma senha acima 6 caracteres';
      return this.setState({ btnDisable: true, errors });
    }

    return this.setState({ btnDisable: false, errors });
  }

  render() {
    const { userEmail, userPassword, btnDisable, errors } = this.state;
    return (
      <form>
        <h1>Login</h1>
        <label htmlFor="userEmail">
          Email
          <input
            data-testid="email-input"
            type="email"
            name="userEmail"
            value={ userEmail }
            onChange={ (e) => this.handleChange(e) }
          />
          {errors.errorEmail && <span className="error">{errors.errorEmail}</span>}
        </label>
        <label htmlFor="userEmail">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="userPassword"
            value={ userPassword }
            onChange={ (e) => this.handleChange(e) }
          />
          {errors.userPassword && <span className="error">{errors.userPassword}</span>}
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ btnDisable }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatch: (email) => dispatch(addEmail(email)),
});

login.propTypes = {
  userEmailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(null, mapDispatchToProps)(login);
