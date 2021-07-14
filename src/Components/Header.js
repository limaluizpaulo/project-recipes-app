import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Paths from '../Pages/Paths';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePerfil = this.handlePerfil.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      disable: !prevState.disable,
    }));
  }

  handlePerfil() {
    this.setState((prevState) => ({
      redirect: !prevState.redirect,
    }));
  }

  render() {
    const { search, pathname } = this.props;
    const { disable, redirect } = this.state;
    const isArea = pathname.includes('area');
    const isInProgressPage = pathname.includes('in-progress');

    if (redirect) return <Redirect to="/perfil" />;
    if (isInProgressPage) return null;
    return (
      <main>
        <header className="header">
          <button
            type="button"
            onClick={ this.handlePerfil }
          >
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">{ Paths[pathname] }</h1>
          { (search || isArea) && (
            <button
              type="submit"
              data-testid="search-top-btn"
              onClick={ this.handleClick }
              src={ searchIcon }
            >
              <img
                src={ searchIcon }
                alt="search icon"
              />
            </button>
          )}

        </header>
        { disable && (
          <SearchBar />
        )}
      </main>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
