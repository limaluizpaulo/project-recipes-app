import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

import { getStorage } from '../../functions';
import profileImg from '../../images/profile.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Profile() {
  const [showImg, setShowImg] = useState(false);
  const [{ email }] = useState(() => getStorage('user'));

  const renderBtnsProfile = () => (
    <div className="buttonsInProfile">
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
          className="buttonsRecipes"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="buttonsRecipes"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          className="buttonExit"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </div>
  );

  return (
    <main>
      <Header pageName="Perfil" />
      <div className={ (showImg) ? 'bigImgProfile showImage' : 'bigImgProfile' }>
        <img src={ profileImg } alt="img-profile" />
        <button
          type="button"
          className="close"
          onClick={ () => setShowImg(!showImg) }
        >
          <div />
        </button>
      </div>
      <div className="container">
        <div className="card">
          <div className="mainContent">
            <div className="imageProfile">
              <button
                type="button"
                className="bgCamera"
                onClick={ () => setShowImg(!showImg) }
              >
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <FaCamera className="cameraIcon" />
              </button>
            </div>
            <h3 className="userName">{ `@${email.split('@')[0]}` }</h3>
            <h3 data-testid="profile-email" className="email">{ email }</h3>
            <div className="loginSocial">
              {/* eslint-disable-next-line react/jsx-max-depth */}
              <FaFacebookF className="loginSocial-icon" />
              {/* eslint-disable-next-line react/jsx-max-depth */}
              <FaTwitter className="loginSocial-icon" />
              {/* eslint-disable-next-line react/jsx-max-depth */}
              <FaGoogle className="loginSocial-icon" />
            </div>
          </div>
          {renderBtnsProfile()}
        </div>
      </div>
      <Footer />
    </main>
  );
}
