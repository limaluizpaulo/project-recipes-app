import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      <h3 data-testid="page-title">{title}</h3>
    </header>
    // lógica de componentização do header baseado na lógica do próprio arquivo de teste da trybe
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
