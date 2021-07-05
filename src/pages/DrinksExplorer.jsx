import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class DrinksExplorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar Bebidas" explorer={ false } />
        <h2> Drinks Explorer</h2>
        <DownMenu />
      </div>
    );
  }
}

export default DrinksExplorer;
