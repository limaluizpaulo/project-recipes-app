import PropTypes from 'prop-types';
import React, { useState } from 'react';
/* import { useHistory } from 'react-router'; */
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import './header.css';

function Header({ title, classname }) {
  const [isSerching, setIsSerching] = useState(false);
  /* const history = useHistory();
  function onclickImage() {
    history.push('/perfil');
  }
*/
  return (
    <div className="header-body">

      <a
        href="/perfil"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"

        />
      </a>

      <div data-testid="page-title">
        {title}
      </div>
      {
        classname === 'display'
        && (
          <div
            role="button"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
              onClick={ () => setIsSerching(!isSerching) }
              role="presentation"
            />
            {isSerching && <input
              data-testid="search-input"
              type="text"
            />}
          </div>)
      }
    </div>
  );
}

Header.propTypes = {
  classname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
