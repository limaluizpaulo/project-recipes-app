import React, { Component } from 'react';
import ProfileIcon from '../images/profileIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.header = this.header.bind(this);
  }

  header(title = 'Comidas') {
    return (
      <div>
        <header>
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profileImagem" />
          <h1 data-testid="page-title">{ title }</h1>
          <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
        </header>

      </div>
    );
  }

  render() {
    return (
      <div>
        { this.header()}
      </div>
    );
  }
}
export default Header;
