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
      hydeInput: false,
    };

    this.changeRoute = this.changeRoute.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  showInput() {
    const { hydeInput } = this.state;
    this.setState(() => ({
      hydeInput: !hydeInput }));
  }

  changeRoute() {
    this.setState({ redirect: true });
  }

  render() {
    const { title } = this.props;
    const { redirect, hydeInput } = this.state;
    if (redirect) return <Redirect to="/perfil" />;
    return (
      <header>
        <div>
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ this.changeRoute }
            src={ profile }
          >
            <img src={ profile } alt="profile-icon" />
          </button>
          <h2 data-testid="page-title">{title}</h2>
          <button
            onClick={ this.showInput }
            type="button"
            page-title="search-top-btn"
            data-testid="search-top-btn"
            src={ search }
          >
            <img src={ search } alt="search-icon" />
          </button>
          { !hydeInput
            ? (
              <input
                type="hidden"
              />)
            : (
              <input
                data-testid="search-input"
              />
            )}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
