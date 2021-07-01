import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, classname }) {
  const history = useHistory();
  function onclickImage() {
    history.push('/perfil');
  }
  return (
    <div>
      <button
        type="button"
        onClick={ () => onclickImage() }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          // className="icon"
          alt="profile icon"
        />
      </button>

      <div data-testid="page-title">
        {title}
      </div>
      {classname === 'display'
      && <img
        data-testid="search-top-btn"
        src={ searchIcon }
        className="icon"
        alt="search icon"
      />}
    </div>
  );
}

Header.propTypes = {
  classname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
