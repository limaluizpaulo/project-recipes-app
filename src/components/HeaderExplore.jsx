import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/perfil');
  };

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>

      <h2 data-testid="page-title">{title}</h2>
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
