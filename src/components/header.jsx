import React, { Component } from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profileImagem" />
          <img data-testid="page-title" src={ mealIcon } alt="page-title" />
          <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
        </header>
      </div>
    );
  }
}
export default Header;
