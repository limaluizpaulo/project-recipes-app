import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    const { title, search } = this.props;
    const { disable } = this.state;

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
            onClick={ this.handleClick }
          >
            { searchIcon }
          </button>
        )}
        { disable && (
          <SearchBar />
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;
