import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    const { searchIcon } = this.props;

    this.state = {
      redirect: false,
      hydeInput: false,
      hydeSearch: searchIcon,
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
    const { redirect, hydeInput, hydeSearch } = this.state;
    if (redirect) return <Redirect to="/perfil" />;
    return (
      <header>
        <div>
          <div className="header">
            <Button
              variant="light"
              type="button"
              className="button-profile"
              data-testid="profile-top-btn"
              onClick={ this.changeRoute }
              src={ profile }
            >
              <img src={ profile } alt="profile-icon" />
            </Button>
            <h2
              className="explore-ingredients"
              data-testid="page-title"
            >
              {title}
            </h2>
            { !hydeSearch ? (
              <Button
                variant="light"
                onClick={ this.showInput }
                type="button"
                className="button-search"
                page-title="search-top-btn"
                data-testid="search-top-btn"
                src={ search }
              >
                <img src={ search } alt="search-icon" />
              </Button>)
              : (
                <Button
                  type="button"
                  className="button-search-invisible"
                >
                  {' '}
                </Button>)}
          </div>

          { !hydeInput
            ? (
              <input
                type="hidden"
              />)
            : (
              <SearchBar title={ title } />
            )}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};

export default Header;
