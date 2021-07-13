import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    if (name === 'email') {
      this.setState({ email: value }, this.validateForm);
    }
    if (name === 'password') {
      this.setState({ password: value }, this.validateForm);
    }
  }

  onClickSubmit() {
    const { history } = this.props;
    const { email } = this.state;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  validateForm() {
    const { email, password } = this.state;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const seisCaracteres = 6;
    if ((emailRegex.test(email)) && (password.length > seisCaracteres)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="login-background">
        <img className="logo-img" src={ logo } alt="Logo Ta na Mesa" />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="label-login">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="label-login">Senha</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </Form.Group>
          <button
            variant="primary"
            className="buttonLogin"
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ this.onClickSubmit }
          >
            Entrar
          </button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
