import React from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, searchBar } = props;
  // const history = useHistory();
  // const link = () => {
  //   history.push('/perfil');
  // };
  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {searchBar && (
        <button type="button">
          <img src={ searchIcon } alt="search button" data-testid="search-top-btn" />
        </button>
      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

export default Header;
