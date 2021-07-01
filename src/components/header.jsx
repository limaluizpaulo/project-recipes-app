import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './searchBar';
import '../css/header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchBar: false,
    };

    this.header = this.header.bind(this);
    this.verify = this.verify.bind(this);
    this.searchBarTrue = this.searchBarTrue.bind(this);
  }

  verify() {
    const { isSearchBar } = this.state;
    if (isSearchBar === true) {
      return this.setState({ isSearchBar: false });
    }
    return this.setState({ isSearchBar: true });
  }

  searchBarTrue() {
    return (
      <button type="button" onClick={ this.verify }>
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />
      </button>
    );
  }

  header(title = 'Comidas', searchBar = true) {
    return (
      <div>
        <header className="header">
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profileImagem" />
          </Link>
          <h1 data-testid="page-title">{ title }</h1>

          {searchBar === true && this.searchBarTrue()}

        </header>
      </div>
    );
  }

  render() {
    const { isSearchBar } = this.state;
    const { location, searchBarOn } = this.props;
    return (
      <div>
        { location !== undefined
        && this.header(location.pathname
          .substring(1).charAt(0)
          .toUpperCase() + location.pathname.substring(2), searchBarOn)}
        {isSearchBar === true && <SearchBar location={ location.pathname } /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchBarOn: state.isSearchBar.searchBarOn,
});

Header.propTypes = {
  searchBar: PropTypes.shape.isRequired,
  location: PropTypes.shape.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
