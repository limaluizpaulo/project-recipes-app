import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { BiCheckCircle } from 'react-icons/bi';
import { addEmail } from '../action';
import '../css/login.css';

class login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      errors: {
        errorEmail: true,
        errorPassword: true,
      },
      btnDisable: true,
      validate: false,
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
    const lengthPassword = 5;

    if (state.userPassword.length > lengthPassword && state.errors.errorEmail === false) {
      return this.setState({ btnDisable: false,
        errors: { ...state.errors, errorPassword: false } });
    }

    if (/(\w+[0-9]*)+@\w+\.\w+/.test(state.userEmail)) {
      return this.setState({ errors: { ...state.errors, errorEmail: false } });
    }
  }

  render() {
    const { userEmail, userPassword, btnDisable, errors, validate } = this.state;
    console.log(userPassword.length);
    return (
      <section className="main-form">
        <form className="form-login">
          <h1>Bem Vindo!</h1>
          <span className="form-subtitle">Por favor insira sua conta aqui</span>
          <section className="sec-email-password">
            <HiOutlineMail className="icon" />
            <input
              className="login-input"
              data-testid="email-input"
              type="email"
              name="userEmail"
              placeholder="Email"
              value={ userEmail }
              onFocus={ () => this.setState({ validate: true }) }
              onChange={ (e) => this.handleChange(e) }
            />
          </section>
          <section className="sec-email-password">
            <HiOutlineLockClosed className="icon" />
            <input
              className="login-input"
              data-testid="password-input"
              type="password"
              name="userPassword"
              placeholder="Senha"
              value={ userPassword }
              onChange={ (e) => this.handleChange(e) }
            />
          </section>
          {
            validate && (
              <section className="form-validate">
                <span className="validate-title">Validação</span>
                <div>
                  <BiCheckCircle
                    className={ errors.errorEmail ? 'error-check' : 'error-checked' }
                  />
                  <span
                    className={ errors.errorEmail ? 'check-true' : 'check-false' }
                  >
                    Insira um email válido
                  </span>
                </div>
                <div>
                  <BiCheckCircle
                    className={ errors.errorPassword ? 'error-check' : 'error-checked' }
                  />
                  <span
                    className={ errors.errorPassword ? 'check-true' : 'check-false' }
                  >
                    Insira uma senha com mais de 6 caracteres
                  </span>
                </div>
              </section>
            )
          }
          <button
            className={ btnDisable ? 'form-btn-disable' : 'form-btn-enable' }
            data-testid="login-submit-btn"
            type="button"
            disabled={ btnDisable }
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </section>
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
