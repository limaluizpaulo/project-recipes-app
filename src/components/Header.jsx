import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <section>
        <div>
          <button data-testid="profile-top-btn"></button>
          <h2 data-testid="page-title"></h2>
          <button page-title="search-top-btn"></button>
        </div>
      </section>
    );
  }
}

export default Header;
