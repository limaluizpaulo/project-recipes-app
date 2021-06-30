import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.renderSearchButton = this.renderSearchButton.bind(this);
  }

  renderSearchButton() {
    const { title } = this.props
    if (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem') {
      return (
        <li className="nav-item">
          <Link to="/">
            <img
              src={ require('../images/searchIcon.svg') }
              alt="search"
              data-testid="search-top-btn"
            />
          </Link>
        </li>
      );
    }
    return null;
  };

  render() {
    const { title } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 data-testid="page-title">{ title }</h1>
          <div id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/perfil">
                  <img
                    src={ require('../images/profileIcon.svg') }
                    alt="profile"
                    data-testid="profile-top-btn"
                  />
                </Link>
              </li>
              { this.renderSearchButton() }
            </ul>
          </div>
        </div>
      </nav>
    );
  };
}

export default Header;
