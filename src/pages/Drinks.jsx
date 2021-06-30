import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Drinks extends Component {
  render() {
    return (
      <div>
        <Header header="Bebidas" explorer />
        <h2> vodK </h2>
        <DownMenu />
      </div>
    );
  }
}

export default Drinks;
