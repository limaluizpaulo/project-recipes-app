import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import './header.css';

function Header({ title, haveSrc = false }) {
  const history = useHistory();
  const [searchField, setSearchField] = useState(false);

  return (
    <>
      <header className="Header">
        <button
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>

        <h3 data-testid="page-title">{ title }</h3>

        {
          haveSrc ? (
            <button
              type="button"
              onClick={
                () => (searchField ? setSearchField(false) : setSearchField(true))
              }
            >
              <img src={ searchIcon } alt="profile icon" data-testid="search-top-btn" />
            </button>
          ) : (<div />)
        }
      </header>

      {searchField && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSrc: PropTypes.bool.isRequired,
};

export default Header;
