import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Paths from '../Pages/Paths';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      disable: !prevState.disable,
    }));
  }

  render() {
    const { search, pathname } = this.props;
    const { disable } = this.state;
    const isArea = pathname.includes('area');
    const isInProgressPage = pathname.includes('in-progress');

    if (isInProgressPage) return null;
    return (
      <main>
        <header className="header">
          <Link to="/perfil">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </Link>
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
