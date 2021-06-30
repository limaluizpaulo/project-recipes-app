import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.renderSearchButton = this.renderSearchButton.bind(this);
  }

  renderSearchButton() {
    const { title } = this.props;
    if (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem') {
      return (
        <Link to="/">
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </Link>
      );
    }
    return null;
  }

  render() {
    const { title } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 data-testid="page-title">{ title }</h1>
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </Link>
          { this.renderSearchButton() }
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  // adicionarUsuarioState: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
