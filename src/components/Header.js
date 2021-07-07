import PropTypes from 'prop-types';
import React, { useState } from 'react';
/* import { useHistory } from 'react-router'; */
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import './components.css';
import SearchFood from './SearchFood';

function Header({ title, display }) {
  const [isSerching, setIsSerching] = useState(false);
  /* const history = useHistory();
  function onclickImage() {
    history.push('/perfil');
  }
*/
  return (
    <div className="header-body">
      <div>

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
          display === 'true'
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
          </div>)
        }
      </div>
      {isSerching && <SearchFood recipe={ title } />}
    </div>
  );
}

Header.propTypes = {
  display: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Header;
