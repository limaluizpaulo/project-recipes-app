import React from 'react';
import { useHistory /*  useLocation  */ } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  // const { pathname } = useLocation();
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        onClick={ () => {
          history.push('/perfil');
        } }
      >
        <img src={ profileIcon } alt="ícone de perfil" data-testid="profile-top-btn" />

      </button>
      <h1 data-testid="page-title">oi</h1>
      <i src={ searchIcon } data-testid="search-top-btn" />
    </header>
  );
}

export default Header;
