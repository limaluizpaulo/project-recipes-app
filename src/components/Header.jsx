import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute() {
    this.setState({ redirect: true });
  }

  render() {
    const { title } = this.props;
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/perfil" />;
    return (
      <header>
        <div>
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ this.changeRoute }
          >
            <img src={ profile } alt="profile-icon" />
          </button>
          <h2 data-testid="page-title">{title}</h2>
          <button type="button" page-title="search-top-btn">
            <img src={ search } alt="search-icon" />
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
