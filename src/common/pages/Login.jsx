import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLockAlt, BiUser } from 'react-icons/bi';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
// import imgLogin from '../../images/img-login.svg';
import imgLogin from '../../images/fine-chefs-logo.svg';
import store, { addLogin } from '../../context/store';
import { setStorage } from '../../functions';
// ajustando GIT

export default function Login() {
  const [signUp, setSignUp] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { user, setUser } = useContext(store);
  const { email, password } = user;

  const validationEmailPwd = () => {
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const Email = regex.test(email);
    const Pwd = password.length;
    const minPwd = 7;

    if (Email && Pwd >= minPwd) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleClick = () => {
    setStorage('user', { email });
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    setDisabledBtn(true);
  };

  // CICLOS DE VIDA --------------------------------------------------------------------------

  useEffect(validationEmailPwd, [email, password.length, user]);

  // ------------------------------------------------------------------------------------------
  return (
    <div className="login">
      <div className="loginImg">
        <img src={ imgLogin } alt="img-login" />
      </div>

      <div className="loginForms">
        <form className={ (signUp) ? 'loginRegister none' : 'loginRegister' }>
          <h1 className="loginTitle">Sign In</h1>

          <div className="loginBox">
            <BiUser className="loginIcon" />
            <input
              name="email"
              placeholder="Insira seu e-mail"
              autoComplete="off"
              data-testid="email-input"
              className="loginInput"
              onChange={ (e) => setUser(addLogin(e)) }
            />
          </div>

          <div className="loginBox">
            <BiLockAlt className="loginIcon" />
            <input
              type="password"
              name="password"
              placeholder="Insira sua senha de 7 dígitos"
              data-testid="password-input"
              className="loginInput"
              onChange={ (e) => setUser(addLogin(e)) }
            />
          </div>

          <a href className="loginForgot">Esqueceu sua senha?</a>

          <Link to="/comidas">
            <button
              type="button"
              data-testid="login-submit-btn"
              className="loginButton"
              disabled={ disabledBtn }
              onClick={ handleClick }
            >
              Entrar
            </button>
          </Link>

          <div>
            <span className="loginAccount">Não tem uma conta ?</span>
            <button
              type="button"
              onClick={ () => setSignUp(!signUp) }
              className="loginSignin"
            >
              Registre-se
            </button>
          </div>
        </form>

        <form className={ (signUp) ? 'loginCreate' : 'loginCreate none' }>
          <h1 className="loginTitle">Crie sua conta</h1>

          <div className="loginBox">
            <BiUser className="loginIcon" />
            <input type="text" placeholder="Username" className="loginInput" />
          </div>

          <div className="loginBox">
            <BiLockAlt className="loginIcon" />
            <input
              name="email"
              placeholder="Insira um e-mail válido"
              autoComplete="off"
              className="loginInput"
            />
          </div>

          <div className="loginBox">
            <BiLockAlt className="loginIcon" />
            <input
              type="password"
              name="password"
              placeholder="Insira uma senha de 7 dígitos"
              className="loginInput"
            />
          </div>

          <button
            type="button"
            className="loginButton"
            onClick={ () => setSignUp(!signUp) }
          >
            Criar
          </button>

          <div>
            <span className="loginAccount">Já tem uma conta ?</span>
            <button
              type="button"
              onClick={ () => setSignUp(!signUp) }
              className="loginSignup"
            >
              Acessar conta
            </button>
          </div>

          <div className="loginSocial">
            <FaFacebookF className="loginSocial-icon" />
            <FaTwitter className="loginSocial-icon" />
            <FaGoogle className="loginSocial-icon" />
          </div>
        </form>
      </div>
    </div>
  );
}
