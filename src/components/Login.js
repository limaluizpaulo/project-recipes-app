import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // const sizePass = 6;
  // const { email, password } = this.state;
  // const { login } = this.props;
  // const passwordCheck = password.length >= sizePass;
  // const emailCheck = RegExp(/^[\w+.]+@\w+\.\w{2,}?$/).test(email);

  // function handleChange({ target: { value, name } }) {
  //   // this.setState({
  //   //   [name]: value,
  //   // });
  // }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            // value={ email }
            // onChange={ (event) => {
            //   handleChange(event);
            // } }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            // value={ password }
            type="password"
            // onChange={ (event) => {
            //   handleChange(event);
            // } }
          />
        </label>
        <Link to="/">
          <button
            data-testid="login-submit-btn"
            // disabled={ !passwordCheck || !emailCheck }
            // onClick={ () => { login(email); } }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
