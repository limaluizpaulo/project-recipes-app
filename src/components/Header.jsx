import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImgProfile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import '../Style/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
  }

  render() {
    const { header, explorer } = this.props;
    const { search } = this.state;
    return (
      <header>
        <div className="headerInformation">
          {/* <h2>Header</h2> */}
          <Link to="/perfil" data-testid="profile-top-btn">
            <img src={ ImgProfile } alt="perfil" />
          </Link>
          <h2>{header}</h2>

        </div>
        { explorer
          ? (
            <>
              <button
                type="button"
                onClick={ () => this.setState((prev) => ({ search: !prev.search })) }
              >
                <img
                  src={ searchIcon }
                  alt="icone de busca"
                  data-testid="search-top-btn"
                />
              </button>
              <div>
                { search ? <Search /> : null}
              </div>

            </>)
          : null}

      </header>

    );
  }
}

Header.propTypes = {
  header: PropTypes.string.isRequired,
  explorer: PropTypes.bool.isRequired,
};

export default Header;
