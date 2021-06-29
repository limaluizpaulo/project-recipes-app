import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default class Header extends React.Component {
  render() {
    const { title, search } = this.props;

    return (
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { search && (
          <button
            type="submit"
            data-testid="search-top-btn"
            onClick={ <Redirect to="/explorar" /> }
          >
            { searchIcon }
          </button>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
